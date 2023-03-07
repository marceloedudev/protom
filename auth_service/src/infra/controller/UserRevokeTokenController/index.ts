import CommandFactory from "@/application/factory/CommandFactory";
import HttpInput from "@/domain/http/HttpInput";
import HttpResponse from "@/domain/http/HttpResponse";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UserRevokeTokenInput from "@/application/dto/UserRevokeTokenInput";
import UserRevokeTokenRequest from "@/infra/dto/UserRevokeTokenRequest";

class UserRevokeTokenController {
    #commandFactory: CommandFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#commandFactory = mainInjector.getCommandFactory();
    }

    async execute({ params }: HttpInput) {
        const input = new UserRevokeTokenRequest({
            user_uuid: params.user_uuid,
            refresh_token: params.token,
        });
        await this.#commandFactory.userRevokeToken().execute(
            new UserRevokeTokenInput({
                user_uuid: input.getUserUUID(),
                refresh_token: input.getRefreshToken(),
            })
        );
        return new HttpResponse({
            status: 202,
        });
    }
}

export default UserRevokeTokenController;
