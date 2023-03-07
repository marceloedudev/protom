import EventQueue from "../event/EventQueue";
import Saga from "../sagas/Saga";

export default interface MessageEventBus {
    onStart(): Promise<void>;
    connect(): Promise<void>;
    close(): Promise<void>;
    publish(event: EventQueue, value: object): Promise<void>;
    publishBasic(
        queueName: string,
        exchangeName: string,
        value: object,
        properties
    ): Promise<void>;
    getChannels(): Array<any>;
    closeChannels(): void;
    setSagas(sagas: Array<Saga>): void;
    getSagas(): Array<Saga>;
}
