import NotificationContext from "../errors/base/NotificationErrors";
import SafeRegexAdapter from "../safe-regex/SafeRegexAdapter";
import SafeRegexAdapterImpl from "@/packages/safe-regex/SafeRegexAdapterImpl";

export default class StringDataset {
    #value: string;

    #safeRegexAdapter: SafeRegexAdapter;

    constructor(value) {
        this.#value = value;
        this.#safeRegexAdapter = new SafeRegexAdapterImpl();
    }

    public removeExtraSpaces(): string {
        if (!this.#value) {
            return this.#value;
        }
        const regex = this.#safeRegexAdapter.validate(/\s+/g);
        return this.#value.replace(regex, " ").trim();
    }

    public hasExtraSpaces(): boolean {
        if (!this.#value) {
            return false;
        }
        const regex = this.#safeRegexAdapter.validate(/(\s){2,}/g);
        return (
            regex.test(this.#value) ||
            this.removeExtraSpaces().length !== this.#value.length
        );
    }

    public validate(notifications: NotificationContext): boolean {
        if (this.#value !== "") {
            if (this.hasExtraSpaces()) {
                notifications.addError("Remove extra whitespace");
            }
        }
        return notifications.hasErrors();
    }

    public setValue(value: string): void {
        this.#value = value;
    }

    public getValue(): string {
        return this.#value;
    }
}
