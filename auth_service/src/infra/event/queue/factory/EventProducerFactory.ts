import CreateUserEventProducer from "../producer/CreateUserEventProducer";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";
import SendEmailEventProducer from "../producer/SendEmailEventProducer";
import UserRevokeTokenEventProducer from "../producer/UserRevokeTokenEventProducer";

export default class EventProducerFactory {
    constructor(private readonly messageEventBus: MessageEventBus) {}

    createUser() {
        return new CreateUserEventProducer(this.messageEventBus);
    }

    userRevokeToken() {
        return new UserRevokeTokenEventProducer(this.messageEventBus);
    }

    sendEmail() {
        return new SendEmailEventProducer(this.messageEventBus);
    }
}
