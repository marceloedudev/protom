import CommandFactory from "@/application/factory/CommandFactory";
import CreateUserInput from "@/application/dto/CreateUserInput";
import CreateUserRequest from "@/infra/dto/CreateUserRequest";
import HttpInput from "@/domain/http/HttpInput";
import HttpResponse from "@/domain/http/HttpResponse";
import MainInjector from "@/domain/dependency-injection/MainInjector";

class CreateUserController {
    #commandFactory: CommandFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#commandFactory = mainInjector.getCommandFactory();
    }

    async execute({ body }: HttpInput) {
        const input = new CreateUserRequest(body);
        await this.#commandFactory.createUser().execute(
            new CreateUserInput({
                username: input.getUsername(),
                email: input.getEmail(),
                fullname: input.getFullname(),
                password: input.getPassword(),
            })
        );
        return new HttpResponse({
            status: 202,
        });
    }
}

export default CreateUserController;
