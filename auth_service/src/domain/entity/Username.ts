import NotificationContext from "../errors/base/NotificationErrors";
import SafeRegexAdapter from "../safe-regex/SafeRegexAdapter";
import SafeRegexAdapterImpl from "@/packages/safe-regex/SafeRegexAdapterImpl";

export default class Username {
    #value: string;

    #safeRegexAdapter: SafeRegexAdapter;

    constructor(value) {
        this.#value = value;
        this.#safeRegexAdapter = new SafeRegexAdapterImpl();
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("Field username is required");
        }
        if (this.#value.length < 3 || this.#value.length > 35) {
            notifications.addError(
                "Username cannot be less than 3 or greater than 35"
            );
        }
        if (
            this.#value !== "" &&
            !this.#safeRegexAdapter.validate(/^[a-z0-9_.]+$/).test(this.#value)
        ) {
            notifications.addError("Invalid username");
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
