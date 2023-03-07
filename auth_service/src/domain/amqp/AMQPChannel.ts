import AMQPAssertExchange from "./AMQPAssertExchange";
import AMQPConsume from "./AMQPConsume";
import AMQPExchangeType from "./AMQPExchangeType";
import AMQPPublish from "./AMQPPublish";

export default interface AMQPChannel {
    close(): Promise<void>;

    assertQueue(queue: string, options?): Promise<void>;

    bindQueue(
        queue: string,
        source: string,
        pattern: string,
        args?: any
    ): Promise<void>;

    assertExchange(
        exchange: string,
        type: AMQPExchangeType,
        options?: AMQPAssertExchange
    ): Promise<void>;

    publish(
        exchange: string,
        routingKey: string,
        content: Buffer,
        options?: AMQPPublish
    ): Promise<boolean>;

    consume(
        queue: string,
        onMessage: (msg: any | null) => void,
        options?: AMQPConsume
    ): Promise<void>;
}
