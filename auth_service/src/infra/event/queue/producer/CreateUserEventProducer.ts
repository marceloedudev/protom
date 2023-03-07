import EventQueueCreateUser from "@/domain/event/EventQueueCreateUser";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";

export default class CreateUserEventProducer {
    constructor(private readonly messageEventBus: MessageEventBus) {}

    async execute(input): Promise<void> {
        console.log("CreateUserEventProducer: ", { input });
        await this.messageEventBus.publish(new EventQueueCreateUser(), input);
    }
}
