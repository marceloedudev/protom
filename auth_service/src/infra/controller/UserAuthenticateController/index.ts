import HttpInput from "@/domain/http/HttpInput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateRequest from "@/infra/dto/UserAuthenticateRequest";
import UserAuthenticateResponse from "@/infra/dto/UserAuthenticateResponse";

class UserAuthenticateController {
    #usecaseFactory: UsecaseFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#usecaseFactory = mainInjector.getUsecaseFactory();
    }

    async execute({ body, headers, ip_address }: HttpInput) {
        const input = new UserAuthenticateRequest(body);
        const userAuthenticate = this.#usecaseFactory.createUserAuthenticate();
        const authenticate = await userAuthenticate.execute(
            new UserAuthenticateInput({
                email: input.getEmail(),
                password: input.getPassword(),
                ip_address,
                useragent: headers["user-agent"],
            })
        );
        console.log("UserAutenticate CODE: ", { code: authenticate.getCode() });
        const output: UserAuthenticateResponse = new UserAuthenticateResponse({
            user_uuid: authenticate.getUserUUID(),
        });
        return output.toJSON();
    }
}

export default UserAuthenticateController;
