import EventQueue from "./EventQueue";

export default class EventQueueUserRevokeToken extends EventQueue {
    constructor() {
        super({
            queueName: "queue-user-revoke-token",
            dlqEnabled: true,
            retryEnabled: true,
            maxRetryAttempt: 2,
            interval: 6,
        });
    }
}
