import NotificationContext from "../errors/base/NotificationErrors";

class UserAuthorize {
    #code: string;

    #user_uuid: string;

    #notifications: NotificationContext;

    constructor({ code, user_uuid }) {
        this.#code = code;
        this.#user_uuid = user_uuid;
        this.#notifications = new NotificationContext();
    }

    validate(): boolean {
        if (!this.#code || this.#code === "") {
            this.#notifications.addError("Field code is required");
        }
        if (!this.#user_uuid || this.#user_uuid === "") {
            this.#notifications.addError("Field user uid is required");
        }
        return this.#notifications.hasErrors();
    }

    getNotifications(): string[] {
        return this.#notifications.getErrors();
    }

    getCode(): string {
        return this.#code;
    }

    getUserUUID(): string {
        return this.#user_uuid;
    }
}

export default UserAuthorize;
