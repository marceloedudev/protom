/* eslint-disable no-param-reassign */
export default class RetryInterval {
    constructor(private readonly interval: number) {}

    public getRetryInterval(count: number) {
        const seconds = this.interval * count;
        const milliseconds = seconds * 1000;
        return milliseconds;
    }

    public getRetryIntervalTotal(maxRetryAttempt: number) {
        const value = [...Array(maxRetryAttempt).keys()].reduce((acc, num) => {
            acc += this.getRetryInterval(num + 1);
            return acc;
        }, 0);
        const minDelaySecure = 3000;
        return value + minDelaySecure;
    }
}
