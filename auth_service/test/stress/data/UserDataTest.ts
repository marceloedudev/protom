import CreateUserInput from "@/application/dto/CreateUserInput";
import DataStressTest from "../core/DataStressTest";
import ServerBoot from "@/boot/ServerBoot";

export default class UserDataTest implements DataStressTest {
    private serverBoot = new ServerBoot();

    async before(): Promise<void> {
        await this.serverBoot.destroyAll();
        await this.serverBoot.connection();
        await this.serverBoot.configure();
        await this.serverBoot.addServer();

        const usecaseFactory = this.serverBoot
            .getMainInjector()
            .getUsecaseFactory();
        await usecaseFactory.createUserUsecase().execute(
            new CreateUserInput({
                username: "username",
                email: "user@gmail.com",
                fullname: "full name",
                password: "123456@wASD88",
            })
        );
    }

    async after(): Promise<void> {
        await this.serverBoot.destroyAll();
    }
}
