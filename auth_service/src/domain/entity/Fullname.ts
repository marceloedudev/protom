import NotificationContext from "../errors/base/NotificationErrors";
import SafeRegexAdapter from "../safe-regex/SafeRegexAdapter";
import SafeRegexAdapterImpl from "@/packages/safe-regex/SafeRegexAdapterImpl";

export default class Fullname {
    #value: string;

    #safeRegexAdapter: SafeRegexAdapter;

    constructor(value) {
        this.#value = value;
        this.#safeRegexAdapter = new SafeRegexAdapterImpl();
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("Field full name is required");
        }
        if (this.#value.length < 4 || this.#value.length > 64) {
            notifications.addError(
                "Fullname cannot be less than 4 or greater than 64"
            );
        }
        if (
            this.#value !== "" &&
            !this.#safeRegexAdapter
                .validate(/^[a-zA-Z.']+ [a-zA-Z.']+$/)
                .test(this.#value)
        ) {
            notifications.addError("Invalid full name");
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
