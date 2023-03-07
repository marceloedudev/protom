// ref: https://github.com/ExpressenAB/exp-fake-amqplib

/* eslint-disable @typescript-eslint/no-unused-vars */
import AMQPAssertExchange from "@/domain/amqp/AMQPAssertExchange";
import AMQPAssertQueue from "@/domain/amqp/AMQPAssertQueue";
import AMQPChannel from "@/domain/amqp/AMQPChannel";
import AMQPConsume from "@/domain/amqp/AMQPConsume";
import AMQPPublish from "@/domain/amqp/AMQPPublish";
import { Channel } from "amqplib";

export default class AMQPChannelClientAdapter implements AMQPChannel {
    constructor(private readonly channel: Channel) {}

    public async close(): Promise<void> {
        await this.channel.close();
    }

    public async assertQueue(
        queue: string,
        options?: AMQPAssertQueue
    ): Promise<void> {
        await this.channel.assertQueue(queue, options);
    }

    public async assertExchange(
        exchange: string,
        type: string,
        options?: AMQPAssertExchange
    ): Promise<void> {
        await this.channel.assertExchange(exchange, type, options);
    }

    public async bindQueue(
        queue: string,
        exchange: string,
        key: string
    ): Promise<void> {
        await this.channel.bindQueue(queue, exchange, key);
    }

    public async publish(
        exchange,
        routingKey,
        content,
        options?: AMQPPublish
    ): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, content, options);
    }

    public async consume(
        queue: string,
        onMessage: any,
        options?: AMQPConsume
    ): Promise<void> {
        await this.channel.consume(queue, onMessage, options);
    }
}
