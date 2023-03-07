import NotificationContext from "@/domain/errors/base/NotificationErrors";

export default class UserAuthToken {
    #client_id: string;

    #client_secret: string;

    #access_token: string;

    #notifications: NotificationContext;

    constructor(
        client_id?: string,
        client_secret?: string,
        access_token?: string
    ) {
        this.#client_id = client_id ?? "";
        this.#client_secret = client_secret ?? "";
        this.#access_token = access_token ?? "";
        this.#notifications = new NotificationContext();
    }

    validate() {
        const clientsIdCurrent = [
            "auth_service",
            "order_service",
            "stock_service",
            "catalog_service",
        ];
        if (!clientsIdCurrent.includes(this.#client_id)) {
            this.#notifications.addError("Invalid client id internal");
        }
        const clientsSecretCurrent = ["ccab14c1-bc12-401d-97f0-63272ab9f663"];
        if (!clientsSecretCurrent.includes(this.#client_secret)) {
            this.#notifications.addError("Invalid client secret internal");
        }
        //
        if (!this.#client_id || this.#client_id === "") {
            this.#notifications.addError("Field client id is required");
        }
        if (!this.#client_secret || this.#client_secret === "") {
            this.#notifications.addError("Field client secret is required");
        }
        if (!this.#access_token || this.#access_token === "") {
            this.#notifications.addError("Field access token is required");
        }
        return this.#notifications.hasErrors();
    }

    getNotifications() {
        return this.#notifications.getErrors();
    }

    getClientId() {
        return this.#client_id;
    }

    setClientId(client_id: string) {
        this.#client_id = client_id;
    }

    getClientSecret() {
        return this.#client_secret;
    }

    setClientSecret(client_secret: string) {
        this.#client_secret = client_secret;
    }

    getAccessToken() {
        return this.#access_token;
    }

    setAccessToken(access_token: string) {
        this.#access_token = access_token;
    }
}
