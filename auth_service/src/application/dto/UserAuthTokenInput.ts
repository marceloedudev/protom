class UserAuthTokenInput {
    #client_id: string;

    #client_secret: string;

    #access_token: string;

    constructor({ client_id = "", client_secret = "", access_token = "" }) {
        this.#client_id = client_id;
        this.#client_secret = client_secret;
        this.#access_token = access_token;
    }

    getClientId() {
        return this.#client_id;
    }

    getClientSecret() {
        return this.#client_secret;
    }

    getAccessToken() {
        return this.#access_token;
    }
}

export default UserAuthTokenInput;
