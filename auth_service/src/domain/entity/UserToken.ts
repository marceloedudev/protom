import Fullname from "./Fullname";
import NotificationContext from "../errors/base/NotificationErrors";
import UserEmail from "./UserEmail";
import Username from "./Username";

export default class UserToken {
    #user_id: number;

    #username: Username;

    #email: UserEmail;

    #fullname: Fullname;

    #user_uuid: string;

    #access_token: string;

    #refresh_token: string;

    #token_created_at: Date;

    #notifications: NotificationContext;

    constructor({
        user_id,
        username,
        email,
        fullname,
        user_uuid,
        token_created_at,
    }) {
        this.#user_id = user_id;
        this.#username = new Username(username);
        this.#email = new UserEmail(email);
        this.#fullname = new Fullname(fullname);
        this.#user_uuid = user_uuid;
        this.#access_token = "";
        this.#refresh_token = "";
        this.#token_created_at = token_created_at;
        this.#notifications = new NotificationContext();
    }

    validate(): boolean {
        if (!this.#user_id || this.#user_id <= 0) {
            this.#notifications.addError("Field user id is required");
        }
        this.#username.validate(this.#notifications);
        this.#email.validate(this.#notifications);
        this.#fullname.validate(this.#notifications);
        if (!this.#user_uuid || this.#user_uuid === "") {
            this.#notifications.addError("Field user uuid is required");
        }
        return this.#notifications.hasErrors();
    }

    getNotifications(): string[] {
        return this.#notifications.getErrors();
    }

    getUserId(): number {
        return this.#user_id;
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

    getUserUUID(): string {
        return this.#user_uuid;
    }

    setAccessToken(access_token: string): void {
        this.#access_token = access_token;
    }

    getAccessToken(): string {
        return this.#access_token;
    }

    setRefreshToken(refresh_token: string): void {
        this.#refresh_token = refresh_token;
    }

    getRefreshToken(): string {
        return this.#refresh_token;
    }

    setTokenCreatedAt(token_created_at: Date): void {
        this.#token_created_at = token_created_at;
    }

    getTokenCreatedAt(): Date {
        return this.#token_created_at;
    }

    toDataStorage(): object {
        return {
            user_id: this.#user_id,
            username: this.#username.getValue(),
            email: this.#email.getValue(),
            fullname: this.#fullname.getValue(),
            user_uuid: this.#user_uuid,
            access_token: this.#access_token,
            refresh_token: this.#refresh_token,
            token_created_at: this.#token_created_at,
        };
    }
}
