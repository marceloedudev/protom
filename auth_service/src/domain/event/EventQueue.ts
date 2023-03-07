import RetryInterval from "../eventBus/RetryInterval";

abstract class EventQueue {
    #queueName: string;

    #dlqEnabled: boolean;

    #retryEnabled: boolean;

    #maxRetryAttempt: number;

    #interval: number;

    #exchangeName: string;

    #retryName: string;

    #dlqName: string;

    #retryInterval: RetryInterval;

    constructor({
        queueName,
        dlqEnabled,
        retryEnabled,
        maxRetryAttempt,
        interval,
    }) {
        this.#queueName = queueName;
        this.#dlqEnabled = dlqEnabled;
        this.#retryEnabled = retryEnabled;
        this.#maxRetryAttempt = maxRetryAttempt;
        this.#interval = interval;
        this.#exchangeName = `${this.#queueName}-exchange`;
        this.#retryName = `${this.#queueName}-retry`;
        this.#dlqName = `${this.#queueName}-dlq`;
        this.#retryInterval = new RetryInterval(interval);
    }

    getQueueName() {
        return this.#queueName;
    }

    isDlqEnabled() {
        return this.#dlqEnabled;
    }

    isRetryEnabled() {
        return this.#retryEnabled;
    }

    getMaxRetryAttempt() {
        return this.#maxRetryAttempt;
    }

    getInterval() {
        return this.#interval;
    }

    getExchangeName() {
        return this.#exchangeName;
    }

    getRetryName() {
        return this.#retryName;
    }

    getDlqName() {
        return this.#dlqName;
    }

    getRetryInterval(count: number) {
        return this.#retryInterval.getRetryInterval(count);
    }

    getRetryIntervalTotal() {
        return this.#retryInterval.getRetryIntervalTotal(this.#maxRetryAttempt);
    }
}
export default EventQueue;
