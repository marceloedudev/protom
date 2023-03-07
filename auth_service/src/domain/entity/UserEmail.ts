import NotificationContext from "../errors/base/NotificationErrors";
import SafeRegexAdapter from "../safe-regex/SafeRegexAdapter";
import SafeRegexAdapterImpl from "@/packages/safe-regex/SafeRegexAdapterImpl";

export default class UserEmail {
    #value: string;

    #safeRegexAdapter: SafeRegexAdapter;

    constructor(email) {
        this.#value = email;
        this.#safeRegexAdapter = new SafeRegexAdapterImpl();
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("Field email is required");
        }
        if (
            this.#value !== "" &&
            !this.#safeRegexAdapter.validate(/\S+@\S+\.\S+/).test(this.#value)
        ) {
            notifications.addError("Invalid email");
        }
        return notifications.hasErrors();
    }

    setValue(email: string): void {
        this.#value = email;
    }

    getValue(): string {
        return this.#value;
    }
}
