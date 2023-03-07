import HttpInput from "@/domain/http/HttpInput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserRefreshTokenInput from "@/application/dto/UserRefreshTokenInput";
import UserRefreshTokenRequest from "@/infra/dto/UserRefreshTokenRequest";
import UserRefreshTokenResponse from "@/infra/dto/UserRefreshTokenResponse";

class UserRefreshTokenController {
    #usecaseFactory: UsecaseFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#usecaseFactory = mainInjector.getUsecaseFactory();
    }

    async execute({ body }: HttpInput) {
        const input = new UserRefreshTokenRequest(body);
        const token = await this.#usecaseFactory
            .createUserRefreshToken()
            .execute(
                new UserRefreshTokenInput({
                    refresh_token: input.getRefreshToken(),
                })
            );
        const output: UserRefreshTokenResponse = new UserRefreshTokenResponse({
            user_uuid: token.getUserUUID(),
            access_token: token.getAccessToken(),
            expires_in: token.getExpiresIn(),
            token_type: token.getTokenType(),
            refresh_token: token.getRefreshToken(),
        });
        return output.toJSON();
    }
}

export default UserRefreshTokenController;
