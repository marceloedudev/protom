import NotificationContext from "@/domain/errors/base/NotificationErrors";

export default class UserRefreshToken {
    #refresh_token: string;

    #notifications: NotificationContext;

    constructor({ refresh_token }) {
        this.#refresh_token = refresh_token;
        this.#notifications = new NotificationContext();
    }

    validate() {
        if (!this.#refresh_token || this.#refresh_token === "") {
            this.#notifications.addError("Refresh token is required");
        }
        return this.#notifications.hasErrors();
    }

    getNotifications() {
        return this.#notifications.getErrors();
    }

    getRefreshToken() {
        return this.#refresh_token;
    }
}
