import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import { Query } from "@/domain/interfaces/Query";
import TokenDAO from "@/domain/dao/TokenDAO";
import TokenStorage from "@/domain/entity/TokenStorage";
import UserAuthToken from "@/domain/entity/UserAuthToken";
import UserAuthTokenInput from "../dto/UserAuthTokenInput";
import UserAuthTokenOutput from "../dto/UserAuthTokenOutput";

class UserAuthTokenQuery
    implements Query<UserAuthTokenInput, UserAuthTokenOutput>
{
    #tokenDAO: TokenDAO;

    constructor(private readonly mainInjector: MainInjector) {
        this.#tokenDAO = this.mainInjector.createDAO().createTokenDAO();
    }

    async execute(input: UserAuthTokenInput) {
        const userAuthToken = new UserAuthToken(
            input.getClientId(),
            input.getClientSecret(),
            input.getAccessToken()
        );
        if (userAuthToken.validate()) {
            throw new BadRequestException(userAuthToken.getNotifications());
        }
        const tokenStorage = new TokenStorage();
        const accessTokenInCache = await this.#tokenDAO.get(
            tokenStorage.getAccessTokenKeyStorage(
                userAuthToken.getAccessToken()
            )
        );
        if (!accessTokenInCache) {
            throw new NotFoundException(["Invalid token"]);
        }
        return new UserAuthTokenOutput({
            user_id: accessTokenInCache.getUserId(),
            username: accessTokenInCache.getUsername(),
            email: accessTokenInCache.getEmail(),
            fullname: accessTokenInCache.getFullname(),
            user_uuid: accessTokenInCache.getUserUUID(),
        });
    }
}

export default UserAuthTokenQuery;
