class UserAuthorizeInput {
    #code: string;

    #user_uuid: string;

    constructor({ code = "", user_uuid = "" }) {
        this.#code = code;
        this.#user_uuid = user_uuid;
    }

    getCode() {
        return this.#code;
    }

    getUserUUID() {
        return this.#user_uuid;
    }
}

export default UserAuthorizeInput;
