import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import TokenRepository from "@/domain/repository/TokenRepository";
import TokenStorage from "@/domain/entity/TokenStorage";
import TokenType from "@/domain/entity/TokenType";
import { Usecase } from "@/domain/interfaces/Usecase";
import UserAuthorize from "@/domain/entity/UserAuthorize";
import UserAuthorizeInput from "../dto/UserAuthorizeInput";
import UserAuthorizeOutput from "../dto/UserAuthorizeOutput";
import UserToken from "@/domain/entity/UserToken";

class UserAuthorizeUsecase
    implements Usecase<UserAuthorizeInput, UserAuthorizeOutput>
{
    #configToken;

    #tokenRepository: TokenRepository;

    constructor(private readonly mainInjector: MainInjector) {
        this.#configToken = this.mainInjector
            .getConfigFactory()
            .createConfigToken();
        this.#tokenRepository = this.mainInjector
            .createRepository()
            .createTokenRepository();
    }

    async execute(input: UserAuthorizeInput) {
        const userAuthorize = new UserAuthorize({
            code: input.getCode(),
            user_uuid: input.getUserUUID(),
        });
        if (userAuthorize.validate()) {
            throw new BadRequestException(userAuthorize.getNotifications());
        }
        const user = await this.mainInjector
            .createDAO()
            .createUserDAO()
            .findByUUID(input.getUserUUID());
        if (!user) {
            throw new NotFoundException(["User not found"]);
        }
        const existsCode = await this.mainInjector
            .createDAO()
            .createPasscodeDAO()
            .get(user.getUserId(), input.getCode());
        if (!existsCode) {
            throw new BadRequestException(["Invalid code"]);
        }
        const userToken = new UserToken({
            user_id: user.getUserId(),
            username: user.getUsername(),
            email: user.getEmail(),
            fullname: user.getFullname(),
            user_uuid: user.getUserUUID(),
            token_created_at: this.mainInjector.getDateAdapter().now(),
        });
        if (userToken.validate()) {
            throw new BadRequestException(userToken.getNotifications());
        }
        const hashAccessToken = this.mainInjector.getUUIDAdapter().getUUID();
        const hashRefreshToken = this.mainInjector.getUUIDAdapter().getUUID();
        const accessTokenExpires = this.#configToken.accessTokenLifeTime();
        const refreshTokenExpires = this.#configToken.refreshTokenLifeTime();
        userToken.setAccessToken(hashAccessToken);
        userToken.setRefreshToken(hashRefreshToken);
        const tokenStorage = new TokenStorage();
        await this.#tokenRepository.create(
            tokenStorage.getAccessTokenKeyStorage(hashAccessToken),
            accessTokenExpires,
            userToken
        );
        await this.#tokenRepository.create(
            tokenStorage.getRefreshTokenKeyStorage(hashRefreshToken),
            refreshTokenExpires,
            userToken
        );
        await this.mainInjector
            .createRepository()
            .createPasscodeRepository()
            .delete(user.getUserId(), input.getCode());
        const tokenType = new TokenType();
        return new UserAuthorizeOutput({
            user_uuid: userToken.getUserUUID(),
            access_token: hashAccessToken,
            expires_in: accessTokenExpires,
            token_type: tokenType.getBearer(),
            refresh_token: hashRefreshToken,
        });
    }
}

export default UserAuthorizeUsecase;
