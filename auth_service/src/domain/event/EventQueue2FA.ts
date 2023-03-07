import EventQueue from "./EventQueue";

export default class EventQueue2FA extends EventQueue {
    constructor() {
        super({
            queueName: "queue-2fa",
            dlqEnabled: true,
            retryEnabled: true,
            maxRetryAttempt: 2,
            interval: 6,
        });
    }
}
