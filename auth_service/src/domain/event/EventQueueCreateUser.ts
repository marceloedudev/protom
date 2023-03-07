import EventQueue from "./EventQueue";

export default class EventQueueCreateUser extends EventQueue {
    constructor() {
        super({
            queueName: "queue-create-user",
            dlqEnabled: true,
            retryEnabled: true,
            maxRetryAttempt: 2,
            interval: 6,
        });
    }
}
