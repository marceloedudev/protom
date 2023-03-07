import AMQPConnect from "@/domain/amqp/AMQPConnect";
import ConfigFactory from "@/config/ConfigFactory";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import MessageEventBusMemory from "../amqp/memory/MessageEventBusMemory";
import MessageEventBusQueue from "../amqp/queue/MessageEventBusQueue";

export default class MessageEventBusFactory {
    #config: ConfigFactory;

    #errorTracking: ErrorTracking;

    #amqpConnect: AMQPConnect;

    constructor({ config, errorTracking, amqpConnect }) {
        this.#config = config;
        this.#errorTracking = errorTracking;
        this.#amqpConnect = amqpConnect;
    }

    createQueue() {
        const messageEventBusQueue = new MessageEventBusQueue({
            config: this.#config,
            errorTracking: this.#errorTracking,
            amqpConnect: this.#amqpConnect,
        });
        if (this.#config.createConfigMode().isTestInMemory()) {
            return new MessageEventBusMemory(messageEventBusQueue);
        }
        return messageEventBusQueue;
    }
}
