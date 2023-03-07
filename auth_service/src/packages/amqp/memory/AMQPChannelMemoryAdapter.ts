/* eslint-disable security-node/non-literal-reg-expr */
// ref: https://github.com/ExpressenAB/exp-fake-amqplib

/* eslint-disable @typescript-eslint/no-unused-vars */
import AMQPAssertExchange from "@/domain/amqp/AMQPAssertExchange";
import AMQPAssertQueue from "@/domain/amqp/AMQPAssertQueue";
import AMQPChannel from "@/domain/amqp/AMQPChannel";
import AMQPConsume from "@/domain/amqp/AMQPConsume";
import AMQPPublish from "@/domain/amqp/AMQPPublish";

interface AMQPQueues {
    messages: Array<any>;
    subscribers: Array<any>;
    options: any;
}

interface AMQPExchanges {
    bindings: Array<any>;
    type: string;
    options: any;
}

interface AMQPDeadLetters {
    count: number;
    expiration: number;
}

export default class AMQPChannelMemoryAdapter implements AMQPChannel {
    private exchanges: Map<string, AMQPExchanges>;

    private queues: Map<string, AMQPQueues>;

    private deadLetters: Map<string, AMQPDeadLetters>;

    constructor() {
        this.exchanges = new Map();
        this.queues = new Map();
        this.deadLetters = new Map();
    }

    public async close(): Promise<void> {
        //
    }

    public async assertQueue(
        queue: string,
        options?: AMQPAssertQueue
    ): Promise<void> {
        if (!this.queues.get(queue)) {
            this.queues.set(queue, {
                messages: [],
                subscribers: [],
                options,
            });
        }
    }

    public async assertExchange(
        exchange: string,
        type: string,
        options?: AMQPAssertExchange
    ): Promise<void> {
        if (!this.exchanges.get(exchange)) {
            this.exchanges.set(exchange, {
                bindings: [],
                type,
                options,
            });
        }
    }

    public async bindQueue(
        queue: string,
        exchange: string,
        key: string
    ): Promise<void> {
        const currentExchange = this.exchanges.get(exchange);
        if (!currentExchange) {
            throw new Error(`Bind to non-existing exchange ${exchange}`);
        }
        const name = `${key
            .replace(".", "\\.")
            .replace("#", "(\\S)+")
            .replace("*", "\\w+")}`;
        const regex = new RegExp(`^${name}$`);
        currentExchange.bindings.push({
            regex,
            queueName: queue,
        });
        this.exchanges.set(exchange, currentExchange);
    }

    private getHeaderModel({ count, exchange, routingKey, expiration }) {
        return {
            "x-death": [
                {
                    count,
                    exchange: `${exchange}`,
                    "original-expiration": expiration,
                    queue: `${routingKey}`,
                    reason: "expired",
                    "routing-keys": [`${routingKey}`],
                    time: {
                        "!": "timestamp",
                        value: Date.now() + expiration,
                    },
                },
            ],
            "x-first-death-exchange": `${exchange}`,
            "x-first-death-queue": `${routingKey}`,
            "x-first-death-reason": "expired",
        };
    }

    private applyDeadLetters(key: string, { expiration }) {
        const currentDL = this.deadLetters.get(key);
        if (!currentDL) {
            this.deadLetters.set(key, {
                count: 1,
                expiration,
            });
        } else {
            currentDL.count += 1;
            this.deadLetters.set(key, currentDL);
        }
    }

    public async publish(
        exchange,
        routingKey,
        content,
        options?: AMQPPublish
    ): Promise<boolean> {
        const currentExchange = this.exchanges.get(exchange);
        if (!currentExchange) {
            throw new Error(`Publish to non-existing exchange ${exchange}`);
        }
        const { bindings } = currentExchange;
        const matchingBindings = bindings.filter((b) =>
            b.regex.test(routingKey)
        );
        const headers = options?.headers ?? {};
        const expiration = Number(options?.expiration || 0);
        matchingBindings.forEach((binding) => {
            const currentQueue: any = this.queues.get(binding.queueName);
            const subscribers = currentQueue ? currentQueue.subscribers : [];
            let subsDeadLetter = [];
            const { deadLetterExchange = null, deadLetterRoutingKey = null } =
                currentQueue.options ?? {};
            let deadLetterProps = {};
            if (deadLetterExchange && deadLetterRoutingKey) {
                this.applyDeadLetters(deadLetterRoutingKey, { expiration });
                const currentDeadLetter =
                    this.deadLetters.get(deadLetterRoutingKey);
                if (!currentDeadLetter) {
                    throw new Error("Invalid dead letter");
                }
                deadLetterProps = this.getHeaderModel({
                    count: currentDeadLetter.count,
                    exchange,
                    routingKey,
                    expiration,
                });
                const referenceQueue: any =
                    this.queues.get(deadLetterRoutingKey);
                subsDeadLetter = referenceQueue
                    ? referenceQueue.subscribers
                    : [];
            }
            for (const subscriber of [...subscribers, ...subsDeadLetter]) {
                const message = {
                    fields: {
                        // consumerTag: "",
                        // deliveryTag: 1,
                        // redelivered: false,
                        exchange,
                        routingKey,
                    },
                    properties: {
                        ...options,
                        headers: {
                            ...headers,
                            ...deadLetterProps,
                        },
                    },
                    content,
                };
                const timeout = expiration;
                setTimeout(() => {
                    subscriber(message);
                }, timeout);
            }
        });
        return Promise.resolve(true);
    }

    public async consume(
        queue: string,
        onMessage: any,
        options?: AMQPConsume
    ): Promise<void> {
        const current = this.queues.get(queue);
        if (!current) {
            throw new Error("Queue not found");
        }
        current.subscribers.push(onMessage);
        this.queues.set(queue, current);
    }
}
