import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import ConflictException from "@/domain/errors/exceptions/ConflictException";
import CreateUser from "@/domain/entity/CreateUser";
import CreateUserInput from "../dto/CreateUserInput";
import CreateUserOutput from "../dto/CreateUserOutput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import { Usecase } from "@/domain/interfaces/Usecase";

class CreateUserUsecase implements Usecase<CreateUserInput, CreateUserOutput> {
    constructor(private readonly mainInjector: MainInjector) {}

    async execute(input: CreateUserInput) {
        const createUser = new CreateUser({
            username: input.getUsername(),
            email: input.getEmail(),
            fullname: input.getFullname(),
            password: input.getPassword(),
        });
        if (createUser.validate()) {
            throw new BadRequestException(createUser.getNotifications());
        }
        const user = await this.mainInjector
            .createDAO()
            .createUserDAO()
            .findByEmailOrUsername(
                createUser.getEmail(),
                createUser.getUsername()
            );
        if (user) {
            throw new ConflictException(["Email/username already in use"]);
        }
        createUser.setEmailVerified(false);
        createUser.setActive(true);
        createUser.setUserUUID(
            await this.mainInjector.getUUIDAdapter().getUUID()
        );
        await this.mainInjector
            .createRepository()
            .createUserRepository()
            .create(createUser);
        return new CreateUserOutput({
            message: "User created successfully",
        });
    }
}

export default CreateUserUsecase;
