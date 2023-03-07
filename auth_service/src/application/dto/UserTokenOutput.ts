class UserTokenResponse {
    #user_id: number;

    #access_token: string;

    #expires_in: number;

    #token_type: string;

    #refresh_token: string;

    #user_uuid: number;

    constructor({
        user_id,
        access_token,
        expires_in,
        token_type,
        refresh_token,
        user_uuid,
    }) {
        this.#user_id = user_id;
        this.#access_token = access_token;
        this.#expires_in = expires_in;
        this.#token_type = token_type;
        this.#refresh_token = refresh_token;
        this.#user_uuid = user_uuid;
    }

    getUserId() {
        return this.#user_id;
    }

    getAccessToken() {
        return this.#access_token;
    }

    getExpiresIn() {
        return this.#expires_in;
    }

    getTokenType() {
        return this.#token_type;
    }

    getRefreshToken() {
        return this.#refresh_token;
    }

    getUserUUID() {
        return this.#user_uuid;
    }
}

export default UserTokenResponse;
