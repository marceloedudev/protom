import AMQPConnection from "./AMQPConnection";

export default interface AMQPConnect {
    connect(url: string): Promise<AMQPConnection>;
}
