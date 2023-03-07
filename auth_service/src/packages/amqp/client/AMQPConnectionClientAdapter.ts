import AMQPChannel from "@/domain/amqp/AMQPChannel";
import AMQPChannelClientAdapter from "./AMQPChannelClientAdapter";
import AMQPConnection from "@/domain/amqp/AMQPConnection";
import { Connection } from "amqplib";

export default class AMQPConnectionClientAdapter implements AMQPConnection {
    constructor(private readonly connection: Connection) {}

    public async close(): Promise<void> {
        await this.connection.close();
    }

    public async createChannel(): Promise<AMQPChannel> {
        const channel = await this.connection.createChannel();
        return new AMQPChannelClientAdapter(channel);
    }
}
