import CreateUserCommand from "../commands/CreateUserCommand";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import SendEmailCommand from "../commands/SendEmailCommand";
import UserRevokeTokenCommand from "../commands/UserRevokeTokenCommand";

export default class CommandFactory {
    #event;

    constructor(private readonly mainInjector: MainInjector) {
        this.#event = this.mainInjector.getEventProducerFactory();
    }

    createUser() {
        return new CreateUserCommand(this.#event);
    }

    userRevokeToken() {
        return new UserRevokeTokenCommand(this.#event);
    }

    sendEmail() {
        return new SendEmailCommand(this.#event);
    }
}
