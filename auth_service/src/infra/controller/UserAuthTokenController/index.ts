import HttpInput from "@/domain/http/HttpInput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import QueryFactory from "@/application/factory/QueryFactory";
import UserAuthTokenInput from "@/application/dto/UserAuthTokenInput";
import UserAuthTokenRequest from "@/infra/dto/UserAuthTokenRequest";
import UserAuthTokenResponse from "@/infra/dto/UserAuthTokenResponse";

class UserAuthTokenController {
    #queryFactory: QueryFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#queryFactory = mainInjector.getQueryFactory();
    }

    async execute({ body }: HttpInput) {
        const input = new UserAuthTokenRequest(body);
        const userData = await this.#queryFactory.createUserAuthToken().execute(
            new UserAuthTokenInput({
                client_id: input.getClientId(),
                client_secret: input.getClientSecret(),
                access_token: input.getAccessToken(),
            })
        );
        const output = new UserAuthTokenResponse({
            user_id: userData.getUserId(),
            username: userData.getUsername(),
            email: userData.getEmail(),
            fullname: userData.getFullname(),
            user_uuid: userData.getUserUUID(),
        });
        return output.toJSON();
    }
}

export default UserAuthTokenController;
