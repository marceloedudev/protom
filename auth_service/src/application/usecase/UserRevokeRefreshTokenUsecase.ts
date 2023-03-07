import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import ReaderTokenDAO from "@/domain/dao/TokenDAO";
import TokenStorage from "@/domain/entity/TokenStorage";
import { Usecase } from "@/domain/interfaces/Usecase";
import UserRevokeRefreshToken from "@/domain/entity/UserRevokeRefreshToken";
import UserRevokeTokenInput from "../dto/UserRevokeTokenInput";
import UserRevokeTokenOutput from "../dto/UserRevokeTokenOuput";
import WriterTokenRepository from "@/domain/repository/TokenRepository";

class UserRevokeRefreshTokenUsecase
    implements Usecase<UserRevokeTokenInput, UserRevokeTokenOutput>
{
    #tokenDAO: ReaderTokenDAO;

    #tokenRepository: WriterTokenRepository;

    constructor(private readonly mainInjector: MainInjector) {
        this.#tokenDAO = this.mainInjector.createDAO().createTokenDAO();
        this.#tokenRepository = this.mainInjector
            .createRepository()
            .createTokenRepository();
    }

    async execute(input: UserRevokeTokenInput) {
        const userRefreshToken = new UserRevokeRefreshToken({
            user_uuid: input.getUserUUID(),
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
        if (
            refreshTokenInCache.getUserUUID() !== userRefreshToken.getUserUUID()
        ) {
            throw new NotFoundException(["Invalid user id"]);
        }
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
        return new UserRevokeTokenOutput({
            message: "Token removed successfully",
        });
    }
}

export default UserRevokeRefreshTokenUsecase;
