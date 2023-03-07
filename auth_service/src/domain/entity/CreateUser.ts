import Fullname from "./Fullname";
import NotificationContext from "../errors/base/NotificationErrors";
import UserEmail from "./UserEmail";
import UserPassword from "./UserPassword";
import Username from "./Username";

class CreateUser {
    #username: Username;

    #email: UserEmail;

    #fullname: Fullname;

    #password: UserPassword;

    #email_verified: boolean;

    #active: boolean;

    #user_uuid: string;

    #notifications: NotificationContext;

    constructor({ username, email, fullname, password }) {
        this.#username = new Username(username);
        this.#email = new UserEmail(email);
        this.#fullname = new Fullname(fullname);
        this.#password = new UserPassword(password);
        this.#email_verified = false;
        this.#active = false;
        this.#notifications = new NotificationContext();
        this.#user_uuid = "";
    }

    validate(): boolean {
        this.#username.validate(this.#notifications);
        this.#email.validate(this.#notifications);
        this.#fullname.validate(this.#notifications);
        this.#password.validate(this.#notifications);
        return this.#notifications.hasErrors();
    }

    getNotifications(): string[] {
        return this.#notifications.getErrors();
    }

    getPassword(): string {
        return this.#password.getValue();
    }

    async getPasswordHash(): Promise<string> {
        return this.#password.getPasswordHash();
    }

    getUsername(): string {
        return this.#username.getValue();
    }

    getEmail(): string {
        return this.#email.getValue();
    }

    getFullname(): string {
        return this.#fullname.getValue();
    }

    getEmailVerified(): boolean {
        return this.#email_verified;
    }

    setEmailVerified(email_verified: boolean): void {
        this.#email_verified = email_verified;
    }

    getActive(): boolean {
        return this.#active;
    }

    setActive(active: boolean): void {
        this.#active = active;
    }

    getUserUUID(): string {
        return this.#user_uuid;
    }

    setUserUUID(uuid: string): void {
        this.#user_uuid = uuid;
    }
}

export default CreateUser;
