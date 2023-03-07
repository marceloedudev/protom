/* eslint-disable security-node/detect-crlf */
/* eslint-disable no-console */
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import EventQueue from "@/domain/event/EventQueue";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";

export default abstract class MessageHandler {
    abstract getQueue(): EventQueue;

    abstract onMessage(body): Promise<void>;

    #errorTracking: ErrorTracking;

    #eventQueue: EventQueue;

    #messageEventBus!: MessageEventBus;

    constructor({ errorTracking }) {
        this.#errorTracking = errorTracking;
        this.#eventQueue = this.getQueue();
    }

    public async onStart({ messageEventBus }): Promise<void> {
        this.#messageEventBus = messageEventBus;
    }

    public async onDeliveryHandler(payload): Promise<void> {
        try {
            const body = JSON.parse(payload.content.toString());
            await this.onMessage(body);
        } catch (error) {
            this.onThrowError({ error, payload });
        }
    }

    public async onThrowError({ error, payload }) {
        try {
            this.#errorTracking.error(error);
            const { properties = {} } = payload || {};
            await this.retryAttempt({
                properties,
                content: JSON.parse(payload.content.toString()),
            });
        } catch (err) {
            this.#errorTracking.log("[RABBITMQ]: on retry json parse failed");
        }
    }

    private async publishToDLQ({ properties, content }) {
        await this.#messageEventBus.publishBasic(
            this.#eventQueue.getDlqName(),
            this.#eventQueue.getExchangeName(),
            content,
            properties
        );
    }

    private async publishToRetry({ properties, content }) {
        await this.#messageEventBus.publishBasic(
            this.#eventQueue.getRetryName(),
            this.#eventQueue.getExchangeName(),
            content,
            properties
        );
    }

    private async retryAttempt({ properties, content }) {
        try {
            const count = this.getRetryAttemptCount(properties);
            if (!this.#eventQueue.isRetryEnabled()) {
                return;
            }
            if (count <= this.#eventQueue.getMaxRetryAttempt()) {
                await this.publishToRetry({
                    properties: {
                        ...properties,
                        expiration: this.#eventQueue.getRetryInterval(count),
                    },
                    content,
                });
                return;
            }
            delete properties.headers["x-death"];
            if (!this.#eventQueue.isDlqEnabled()) {
                return;
            }
            await this.publishToDLQ({
                properties: {
                    ...properties,
                },
                content,
            });
        } catch (error) {
            console.log("retryAttempt ", { error });
        }
    }

    private getRetryAttemptCount(properties) {
        let count = 0;
        if (properties && properties.headers && properties.headers["x-death"]) {
            count = Number(properties.headers["x-death"][0].count);
        }
        count += 1;
        return count;
    }
}
