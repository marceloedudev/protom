class UserAuthTokenResponse {
    #user_id: number;

    #username: string;

    #email: string;

    #fullname: string;

    #user_uuid: string;

    constructor({ user_id, username, email, fullname, user_uuid }) {
        this.#user_id = user_id;
        this.#username = username;
        this.#email = email;
        this.#fullname = fullname;
        this.#user_uuid = user_uuid;
    }

    toJSON() {
        return {
            user_id: this.#user_id,
            username: this.#username,
            email: this.#email,
            fullname: this.#fullname,
            user_uuid: this.#user_uuid,
        };
    }
}

export default UserAuthTokenResponse;
