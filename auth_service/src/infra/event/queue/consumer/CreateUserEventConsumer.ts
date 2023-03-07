import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import ConflictException from "@/domain/errors/exceptions/ConflictException";
import CreateUserInput from "@/application/dto/CreateUserInput";
import EventQueue from "@/domain/event/EventQueue";
import EventQueueCreateUser from "@/domain/event/EventQueueCreateUser";
import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import UsecaseFactory from "@/application/factory/UsecaseFactory";

export default class CreateUserEventConsumer extends MessageHandler {
    #usecaseFactory: UsecaseFactory;

    #createUser;

    constructor({ usecaseFactory, errorTracking }) {
        super({ errorTracking });
        this.#usecaseFactory = usecaseFactory;
        this.#createUser = this.#usecaseFactory.createUserUsecase();
    }

    getQueue(): EventQueue {
        return new EventQueueCreateUser();
    }

    async onMessage(body): Promise<void> {
        try {
            const user = new CreateUserInput(body);
            await this.#createUser.execute(user);
        } catch (error: any) {
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
