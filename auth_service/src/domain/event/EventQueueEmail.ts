import EventQueue from "./EventQueue";

export default class EventQueueEmail extends EventQueue {
    constructor() {
        super({
            queueName: "queue-email",
            dlqEnabled: true,
            retryEnabled: true,
            maxRetryAttempt: 2,
            interval: 6,
        });
    }
}
