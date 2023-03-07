import HttpInput from "@/domain/http/HttpInput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import UserAuthorizeRequest from "@/infra/dto/UserAuthorizeRequest";
import UserAuthorizeResponse from "@/infra/dto/UserAuthorizeResponse";

class UserAuthorizeController {
    #usecaseFactory: UsecaseFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#usecaseFactory = mainInjector.getUsecaseFactory();
    }

    async execute({ body }: HttpInput) {
        const input = new UserAuthorizeRequest(body);
        const userLogin = this.#usecaseFactory.createUserAuthorize();
        const login = await userLogin.execute(
            new UserAuthorizeInput({
                code: input.getCode(),
                user_uuid: input.getUserUUID(),
            })
        );
        const output: UserAuthorizeResponse = new UserAuthorizeResponse({
            user_uuid: login.getUserUUID(),
            access_token: login.getAccessToken(),
            expires_in: login.getExpiresIn(),
            token_type: login.getTokenType(),
            refresh_token: login.getRefreshToken(),
        });
        return output.toJSON();
    }
}

export default UserAuthorizeController;
