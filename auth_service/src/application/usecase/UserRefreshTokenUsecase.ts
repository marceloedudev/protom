import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import TokenDAO from "@/domain/dao/TokenDAO";
import TokenRepository from "@/domain/repository/TokenRepository";
import TokenStorage from "@/domain/entity/TokenStorage";
import TokenType from "@/domain/entity/TokenType";
import { Usecase } from "@/domain/interfaces/Usecase";
import UserRefreshToken from "@/domain/entity/UserRefreshToken";
import UserRefreshTokenInput from "../dto/UserRefreshTokenInput";
import UserRefreshTokenOuput from "../dto/UserRefreshTokenOuput";
import UserToken from "@/domain/entity/UserToken";

class UserRefreshTokenUsecase
    implements Usecase<UserRefreshTokenInput, UserRefreshTokenOuput>
{
    #configToken;

    #tokenDAO: TokenDAO;

    #tokenRepository: TokenRepository;

    constructor(private readonly mainInjector: MainInjector) {
        this.#configToken = this.mainInjector
            .getConfigFactory()
            .createConfigToken();
        this.#tokenDAO = this.mainInjector.createDAO().createTokenDAO();
        this.#tokenRepository = this.mainInjector
            .createRepository()
            .createTokenRepository();
    }

    async execute(input: UserRefreshTokenInput) {
        const userRefreshToken = new UserRefreshToken({
            refresh_token: input.getRefreshToken(),
        });
        if (userRefreshToken.validate()) {
            throw new BadRequestException(userRefreshToken.getNotifications());
        }
        const tokenStorage = new TokenStorage();
        const refreshTokenInCache = await this.#tokenDAO.get(
            tokenStorage.getRefreshTokenKeyStorage(input.getRefreshToken())
        );
        if (!refreshTokenInCache) {
            throw new NotFoundException(["Invalid token"]);
        }
        const userToken = new UserToken({
            user_id: refreshTokenInCache.getUserId(),
            username: refreshTokenInCache.getUsername(),
            email: refreshTokenInCache.getEmail(),
            fullname: refreshTokenInCache.getFullname(),
            user_uuid: refreshTokenInCache.getUserUUID(),
            token_created_at: refreshTokenInCache.getTokenCreatedAt(),
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
        await this.#tokenRepository.delete(
            tokenStorage.getRefreshTokenKeyStorage(
                userRefreshToken.getRefreshToken()
            )
        );
        await this.#tokenRepository.delete(
            tokenStorage.getAccessTokenKeyStorage(
                refreshTokenInCache.getAccessToken()
            )
        );
        const tokenType = new TokenType();
        return new UserRefreshTokenOuput({
            user_uuid: userToken.getUserUUID(),
            access_token: hashAccessToken,
            expires_in: accessTokenExpires,
            token_type: tokenType.getBearer(),
            refresh_token: hashRefreshToken,
        });
    }
}

export default UserRefreshTokenUsecase;
