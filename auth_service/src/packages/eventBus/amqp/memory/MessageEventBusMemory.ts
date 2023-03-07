import AMQPChannel from "@/domain/amqp/AMQPChannel";
import EventQueue from "@/domain/event/EventQueue";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";
import Saga from "@/domain/sagas/Saga";

export default class MessageEventBusMemory implements MessageEventBus {
    constructor(private readonly messageEventBus: MessageEventBus) {}

    public async publish(event: EventQueue, value: object): Promise<void> {
        await this.messageEventBus.publish(event, value);
    }

    public async onStart(): Promise<void> {
        await this.messageEventBus.onStart();
    }

    public async connect(): Promise<void> {
        await this.messageEventBus.connect();
    }

    public async close(): Promise<void> {
        await this.messageEventBus.close();
    }

    public async publishBasic(
        queueName: string,
        exchangeName: string,
        value: object,
        properties: any
    ): Promise<void> {
        await this.messageEventBus.publishBasic(
            queueName,
            exchangeName,
            value,
            properties
        );
    }

    public getChannels(): Array<AMQPChannel> {
        return this.messageEventBus.getChannels();
    }

    public async closeChannels(): Promise<void> {
        this.messageEventBus.closeChannels();
    }

    public setSagas(sagas: Saga[]): void {
        this.messageEventBus.setSagas(sagas);
    }

    public getSagas(): Saga[] {
        return this.messageEventBus.getSagas();
    }
}
