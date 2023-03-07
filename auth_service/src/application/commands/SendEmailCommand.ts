/* eslint-disable @typescript-eslint/no-unused-vars */
import { Command } from "@/domain/interfaces/Command";
import EventProducerFactory from "@/infra/event/queue/factory/EventProducerFactory";
import SendEmailInput from "../dto/SendEmailInput";

export default class SendEmailCommand implements Command<SendEmailInput> {
    constructor(private readonly event: EventProducerFactory) {}

    async execute(input: SendEmailInput) {
        // await this.event.sendEmail().execute(input);
    }
}
