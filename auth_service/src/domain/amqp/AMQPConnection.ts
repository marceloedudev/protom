import AMQPChannel from "./AMQPChannel";

export default interface AMQPConnection {
    close(): Promise<void>;

    createChannel(): Promise<AMQPChannel>;
}
