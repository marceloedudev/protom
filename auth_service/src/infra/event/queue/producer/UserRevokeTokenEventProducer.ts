import EventQueueUserRevokeToken from "@/domain/event/EventQueueUserRevokeToken";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";

export default class UserRevokeTokenEventProducer {
    constructor(private readonly messageEventBus: MessageEventBus) {}

    async execute(input): Promise<void> {
        await this.messageEventBus.publish(
            new EventQueueUserRevokeToken(),
            input
        );
    }
}
