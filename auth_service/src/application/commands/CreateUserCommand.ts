import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import { Command } from "@/domain/interfaces/Command";
import CreateUser from "@/domain/entity/CreateUser";
import CreateUserInput from "../dto/CreateUserInput";
import EventProducerFactory from "@/infra/event/queue/factory/EventProducerFactory";

export default class CreateUserCommand implements Command<CreateUserInput> {
    constructor(private readonly event: EventProducerFactory) {}

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
        await this.event.createUser().execute(input);
    }
}
