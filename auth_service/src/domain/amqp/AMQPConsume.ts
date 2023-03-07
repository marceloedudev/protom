export default interface AMQPConsume {
    consumerTag?: string | undefined;
    noLocal?: boolean | undefined;
    noAck?: boolean | undefined;
    exclusive?: boolean | undefined;
    priority?: number | undefined;
    arguments?: any;
}
