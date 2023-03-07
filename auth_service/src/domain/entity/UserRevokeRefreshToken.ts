import NotificationContext from "@/domain/errors/base/NotificationErrors";

export default class UserRevokeRefreshToken {
    #user_uuid: string;

    #refresh_token: string;

    #notifications: NotificationContext;

    constructor({ user_uuid, refresh_token }) {
        this.#user_uuid = user_uuid;
        this.#refresh_token = refresh_token;
        this.#notifications = new NotificationContext();
    }

    validate(): boolean {
        if (!this.#user_uuid || this.#user_uuid === "") {
            this.#notifications.addError("User id is required");
        }
        if (!this.#refresh_token || this.#refresh_token === "") {
            this.#notifications.addError("Refresh token is required");
        }
        return this.#notifications.hasErrors();
    }

    getNotifications(): string[] {
        return this.#notifications.getErrors();
    }

    getUserUUID(): string {
        return this.#user_uuid;
    }

    getRefreshToken(): string {
        return this.#refresh_token;
    }
}
