export default interface AMQPAssertExchange {
    durable?: boolean | undefined;
    internal?: boolean | undefined;
    autoDelete?: boolean | undefined;
    alternateExchange?: string | undefined;
    arguments?: any;
}
