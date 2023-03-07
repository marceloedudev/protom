import BcryptAdapter from "../bcryptjs/BcryptAdapter";
import BcryptAdapterImpl from "@/packages/bcryptjs/BcryptAdapterImpl";
import NotificationContext from "../errors/base/NotificationErrors";
import SafeRegexAdapter from "../safe-regex/SafeRegexAdapter";
import SafeRegexAdapterImpl from "@/packages/safe-regex/SafeRegexAdapterImpl";

export default class UserPassword {
    #value: string;

    #safeRegexAdapter: SafeRegexAdapter;

    #bcryptAdapter: BcryptAdapter;

    constructor(password) {
        this.#value = password;
        this.#safeRegexAdapter = new SafeRegexAdapterImpl();
        this.#bcryptAdapter = new BcryptAdapterImpl();
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("Field password is required");
        }
        if (this.#value !== "") {
            if (
                !this.#safeRegexAdapter
                    .validate(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
                    .test(this.#value)
            ) {
                notifications.addError(
                    "Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase"
                );
            }
            if (this.#value.length < 8 || this.#value.length > 64) {
                notifications.addError(
                    "Password cannot be less than 8 or greater than 64"
                );
            }
        }
        return notifications.hasErrors();
    }

    async getPasswordHash(): Promise<string> {
        return this.#bcryptAdapter.hash(this.#value);
    }

    async checkPassword(passwordHash: string): Promise<boolean> {
        const checked = await this.#bcryptAdapter.compare(
            this.#value,
            passwordHash
        );
        return checked;
    }

    setValue(password: string): void {
        this.#value = password;
    }

    getValue(): string {
        return this.#value;
    }
}
