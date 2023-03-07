class User {
    #user_id: number;

    #username: string;

    #email: string;

    #fullname: string;

    #password_hash: string;

    #user_uuid: string;

    constructor({
        user_id,
        username,
        email,
        fullname,
        password_hash,
        user_uuid,
    }) {
        this.#user_id = user_id;
        this.#username = username;
        this.#email = email;
        this.#fullname = fullname;
        this.#password_hash = password_hash;
        this.#user_uuid = user_uuid;
    }

    getUserId() {
        return this.#user_id;
    }

    getUsername() {
        return this.#username;
    }

    getEmail() {
        return this.#email;
    }

    getFullname() {
        return this.#fullname;
    }

    getPasswordHash() {
        return this.#password_hash;
    }

    getUserUUID() {
        return this.#user_uuid;
    }
}

export default User;
