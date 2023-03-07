export default class NotificationContext {
    #notifications: string[];

    constructor() {
        this.#notifications = [];
    }

    hasErrors() {
        return this.#notifications.length > 0;
    }

    addError(notication: string) {
        this.#notifications.push(notication);
    }

    getErrors() {
        return [...new Set(this.#notifications)];
    }
}
