import AMQPChannel from "@/domain/amqp/AMQPChannel";
import AMQPConnection from "@/domain/amqp/AMQPConnection";

export default class AMQPConnectionMemoryAdapter implements AMQPConnection {
    constructor(private readonly channelAdapter: AMQPChannel) {}

    public async close(): Promise<void> {
        //
    }

    public async createChannel(): Promise<AMQPChannel> {
        return this.channelAdapter;
    }
}
