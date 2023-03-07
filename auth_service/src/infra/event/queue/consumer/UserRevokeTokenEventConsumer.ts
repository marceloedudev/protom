import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import ConflictException from "@/domain/errors/exceptions/ConflictException";
import EventQueue from "@/domain/event/EventQueue";
import EventQueueUserRevokeToken from "@/domain/event/EventQueueUserRevokeToken";
import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserRevokeTokenInput from "@/application/dto/UserRevokeTokenInput";

export default class UserRevokeTokenEventConsumer extends MessageHandler {
    #usecaseFactory: UsecaseFactory;

    constructor({ usecaseFactory, errorTracking }) {
        super({ errorTracking });
        this.#usecaseFactory = usecaseFactory;
    }

    getQueue(): EventQueue {
        return new EventQueueUserRevokeToken();
    }

    async onMessage(body): Promise<void> {
        try {
            const user = new UserRevokeTokenInput(body);
            await this.#usecaseFactory
                .createUserRevokeRefreshToken()
                .execute(user);
        } catch (error: any) {
            console.log({ error });
            if (
                error instanceof BadRequestException ||
                error instanceof NotFoundException ||
                error instanceof ConflictException
            ) {
                // notify
                return;
            }
            throw new Error(error.message);
        }
    }
}
