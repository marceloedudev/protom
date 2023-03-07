export default interface AMQPPublish {
    expiration?: string | number | undefined;
    userId?: string | undefined;
    CC?: string | string[] | undefined;

    mandatory?: boolean | undefined;
    persistent?: boolean | undefined;
    deliveryMode?: boolean | number | undefined;
    BCC?: string | string[] | undefined;

    contentType?: string | undefined;
    contentEncoding?: string | undefined;
    headers?: any;
    priority?: number | undefined;
    correlationId?: string | undefined;
    replyTo?: string | undefined;
    messageId?: string | undefined;
    timestamp?: number | undefined;
    type?: string | undefined;
    appId?: string | undefined;
}
