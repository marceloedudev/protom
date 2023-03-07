class RefreshTokenInput {
    #refresh_token: string;

    constructor({ refresh_token = "" }) {
        this.#refresh_token = refresh_token;
    }

    getRefreshToken() {
        return this.#refresh_token;
    }
}

export default RefreshTokenInput;
