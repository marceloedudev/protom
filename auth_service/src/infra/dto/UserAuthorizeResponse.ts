export default class UserAuthorizeResponse {
    #user_uuid: number;

    #access_token: string;

    #expires_in: number;

    #token_type: string;

    #refresh_token: string;

    constructor({
        user_uuid,
        access_token,
        expires_in,
        token_type,
        refresh_token,
    }) {
        this.#user_uuid = user_uuid;
        this.#access_token = access_token;
        this.#expires_in = expires_in;
        this.#token_type = token_type;
        this.#refresh_token = refresh_token;
    }

    toJSON() {
        return {
            user_uuid: this.#user_uuid,
            access_token: this.#access_token,
            expires_in: this.#expires_in,
            token_type: this.#token_type,
            refresh_token: this.#refresh_token,
        };
    }
}
