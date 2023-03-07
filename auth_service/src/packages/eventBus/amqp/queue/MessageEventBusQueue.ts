/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security-node/detect-crlf */
/* eslint-disable no-console */
import AMPQException from "@/domain/errors/exceptions/AMPQException";
import AMQPChannel from "@/domain/amqp/AMQPChannel";
import AMQPConnect from "@/domain/amqp/AMQPConnect";
import AMQPConnection from "@/domain/amqp/AMQPConnection";
import AMQPExchangeType from "@/domain/amqp/AMQPExchangeType";
import ConfigFactory from "@/config/ConfigFactory";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import EventQueue from "@/domain/event/EventQueue";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";
import MessageHandler from "../../abstractions/MessageHandler";
import Saga from "@/domain/sagas/Saga";

export default class MessageEventBusQueue implements MessageEventBus {
    #connection: AMQPConnection | null;

    #channels: Array<AMQPChannel>;

    #config: ConfigFactory;

    #sagas: Array<Saga>;

    #errorTracking: ErrorTracking;

    #amqpConnect: AMQPConnect;

    constructor({ config, errorTracking, amqpConnect }) {
        this.#connection = null;
        this.#config = config;
        this.#channels = [];
        this.#sagas = [];
        this.#errorTracking = errorTracking;
        this.#amqpConnect = amqpConnect;
    }

    public async onStart(): Promise<void> {
        // try {
        const consumers: Array<MessageHandler> = this.registerConsumers();
        await this.subscribeConsumers(consumers);
        // } catch (error) {
        //     console.log({ error });
        //     await this.close();
        // }
    }

    public async connect(): Promise<void> {
        this.#connection = await this.#amqpConnect.connect(
            this.#config.createConfigRabbitMQ().getURL()
        );
        console.log("> RabbitMQ connected");
    }

    public async close(): Promise<void> {
        if (this.#connection) {
            await this.#connection.close();
        }
        console.log("> RabbitMQ disconnected");
    }

    public setConnection(connection) {
        this.#connection = connection;
    }

    public getConnection() {
        return this.#connection;
    }

    public setSagas(sagas: Array<Saga>): void {
        this.#sagas = sagas;
    }

    public getSagas(): Array<Saga> {
        return this.#sagas;
    }

    public async publish(event: EventQueue, value: object): Promise<void> {
        if (!this.#connection) {
            throw new AMPQException(["No connections available"]);
        }
        try {
            const channel = await this.#connection.createChannel();
            if (channel) {
                const message = JSON.stringify(value);
                const nonPersistent = 1;
                channel.publish(
                    event.getExchangeName(),
                    event.getQueueName(),
                    Buffer.from(message),
                    {
                        contentType: "application/json",
                        contentEncoding: "UTF-8",
                        headers: {},
                        deliveryMode: nonPersistent,
                        priority: 0,
                        correlationId: undefined,
                        replyTo: undefined,
                        expiration: undefined,
                        messageId: undefined,
                        timestamp: undefined,
                        type: undefined,
                        userId: undefined,
                        appId: undefined,
                    }
                );
            }
        } catch (error) {
            this.#errorTracking.error(error);
        }
    }

    public async publishBasic(
        queueName: string,
        exchangeName: string,
        value: object,
        properties
    ): Promise<void> {
        if (!this.#connection) {
            throw new AMPQException(["No connections available"]);
        }
        try {
            const channel = await this.#connection.createChannel();
            if (channel) {
                const message = JSON.stringify(value);
                channel.publish(
                    exchangeName,
                    queueName,
                    Buffer.from(message),
                    properties
                );
            }
        } catch (error) {
            this.#errorTracking.error(error);
        }
    }

    public getChannels(): Array<AMQPChannel> {
        return this.#channels;
    }

    public async closeChannels(): Promise<void> {
        if (this.#connection) {
            if (this.#channels.length) {
                const channels: any = [];
                for (const channel of this.#channels) {
                    channels.push(channel.close());
                }
                await Promise.all(channels);
            }
        }
    }

    private registerConsumers(): Array<MessageHandler> {
        const consumers: Array<MessageHandler> = [];
        this.#sagas.forEach((saga: Saga) => {
            saga.stepsDefinitions().forEach((handler) => {
                const invocation = handler.getInvocation();
                if (invocation) {
                    consumers.push(invocation);
                }
                const compensation = handler.getCompensation();
                if (compensation) {
                    consumers.push(compensation);
                }
            });
        });
        return consumers;
    }

    private async subscribeConsumers(consumers: Array<MessageHandler>) {
        if (!this.#connection) {
            throw new AMPQException(["No connections available"]);
        }
        for await (const consumer of consumers) {
            try {
                await consumer.onStart({ messageEventBus: this });
                const channel = await this.#connection.createChannel();
                this.#channels.push(channel);
                await this.createExchangeAndQueue(consumer.getQueue(), channel);
                await channel.consume(
                    consumer.getQueue().getQueueName(),
                    async (payload) => {
                        // if (!payload) {
                        //     return;
                        // }
                        await consumer.onDeliveryHandler(payload);
                    },
                    {
                        noAck: true,
                    }
                );
                console.log(
                    `[*] Waiting for messages ${consumer
                        .getQueue()
                        .getQueueName()}`
                );
            } catch (error) {
                this.#errorTracking.error(error);
            }
        }
    }

    private async createExchangeAndQueue(
        queue: EventQueue,
        channel: AMQPChannel
    ) {
        await channel.assertExchange(
            queue.getExchangeName(),
            AMQPExchangeType.direct,
            {
                durable: true,
            }
        );
        await this.createQueueBase(queue, channel);
        if (queue.isDlqEnabled()) {
            await this.createQueueToDLQ(queue, channel);
        }
        if (queue.isRetryEnabled()) {
            await this.createQueueToRetryAttempt(queue, channel);
        }
    }

    private async createQueueBase(queue: EventQueue, channel: AMQPChannel) {
        await channel.assertQueue(queue.getQueueName(), {
            durable: true,
            exclusive: false,
            autoDelete: false,
        });
        await channel.bindQueue(
            queue.getQueueName(),
            queue.getExchangeName(),
            queue.getQueueName()
        );
    }

    private async createQueueToDLQ(queue: EventQueue, channel: AMQPChannel) {
        await channel.assertQueue(queue.getDlqName(), {
            durable: true,
            exclusive: false,
            autoDelete: false,
        });
        await channel.bindQueue(
            queue.getDlqName(),
            queue.getExchangeName(),
            queue.getDlqName()
        );
    }

    private async createQueueToRetryAttempt(
        queue: EventQueue,
        channel: AMQPChannel
    ) {
        await channel.assertQueue(queue.getRetryName(), {
            durable: true,
            exclusive: false,
            autoDelete: false,
            deadLetterExchange: queue.getExchangeName(),
            deadLetterRoutingKey: queue.getQueueName(),
        });
        await channel.bindQueue(
            queue.getRetryName(),
            queue.getExchangeName(),
            queue.getRetryName()
        );
    }
}
