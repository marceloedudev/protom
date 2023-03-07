import NotificationContext from "../errors/base/NotificationErrors";

export default class Useragent {
    #value: string;

    constructor(value) {
        this.#value = value;
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("Invalid device");
        }
        return notifications.hasErrors();
    }

    setValue(value: string): void {
        this.#value = value;
    }

    getValue(): string {
        return this.#value;
    }
}
