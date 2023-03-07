import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import { Command } from "@/domain/interfaces/Command";
import EventProducerFactory from "@/infra/event/queue/factory/EventProducerFactory";
import UserRevokeRefreshToken from "@/domain/entity/UserRevokeRefreshToken";
import UserRevokeTokenInput from "../dto/UserRevokeTokenInput";

export default class UserRevokeTokenCommand
    implements Command<UserRevokeTokenInput>
{
    constructor(private readonly event: EventProducerFactory) {}

    async execute(input: UserRevokeTokenInput) {
        const userRefreshToken = new UserRevokeRefreshToken({
            user_uuid: input.getUserUUID(),
            refresh_token: input.getRefreshToken(),
        });
        if (userRefreshToken.validate()) {
            throw new BadRequestException(userRefreshToken.getNotifications());
        }
        await this.event.userRevokeToken().execute(input);
    }
}
