class UserAuthorizeInfoOutput {
    #user_uuid: string;

    #ip_address: string;

    #useragent: string;

    #user_id: number;

    #code: string;

    constructor({ user_uuid, ip_address, useragent, user_id, code }) {
        this.#user_uuid = user_uuid;
        this.#ip_address = ip_address;
        this.#useragent = useragent;
        this.#user_id = user_id;
        this.#code = code;
    }

    getUserUUID() {
        return this.#user_uuid;
    }

    getIPAddress() {
        return this.#ip_address;
    }

    getUseragent() {
        return this.#useragent;
    }

    getUserId() {
        return this.#user_id;
    }

    getCode() {
        return this.#code;
    }
}

export default UserAuthorizeInfoOutput;
