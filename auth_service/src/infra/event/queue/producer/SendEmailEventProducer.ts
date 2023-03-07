import EventQueueEmail from "@/domain/event/EventQueueEmail";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";

export default class SendEmailEventProducer {
    constructor(private readonly messageEventBus: MessageEventBus) {}

    async execute(input): Promise<void> {
        await this.messageEventBus.publish(new EventQueueEmail(), input);
    }
}
