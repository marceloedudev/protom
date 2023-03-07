import IPAddress from "./IPAddress";
import NotificationContext from "@/domain/errors/base/NotificationErrors";
import UserEmail from "./UserEmail";
import UserPassword from "./UserPassword";
import Useragent from "./Useragent";

export default class UserAuthenticate {
    #email: UserEmail;

    #password: UserPassword;

    #ip_address: IPAddress;

    #useragent: Useragent;

    #notifications: NotificationContext;

    constructor({ email, password, ip_address, useragent }) {
        this.#email = new UserEmail(email);
        this.#password = new UserPassword(password);
        this.#ip_address = new IPAddress(ip_address);
        this.#useragent = new Useragent(useragent);
        this.#notifications = new NotificationContext();
    }

    validate(): boolean {
        this.#email.validate(this.#notifications);
        this.#password.validate(this.#notifications);
        this.#ip_address.validate(this.#notifications);
        this.#useragent.validate(this.#notifications);
        return this.#notifications.hasErrors();
    }

    getNotifications(): string[] {
        return this.#notifications.getErrors();
    }

    async checkPassword(passwordHash: string): Promise<boolean> {
        return this.#password.checkPassword(passwordHash);
    }

    getEmail(): string {
        return this.#email.getValue();
    }

    getPassword(): string {
        return this.#password.getValue();
    }

    getIPAddress(): string {
        return this.#ip_address.getValue();
    }

    getUseragent(): string {
        return this.#useragent.getValue();
    }
}
