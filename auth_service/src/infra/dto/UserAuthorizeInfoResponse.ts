class UserAuthorizeInfoResponse {
    #user_uuid: string;

    #ip_address: string;

    #useragent: string;

    #code: string;

    constructor({ user_uuid, ip_address, useragent, code }) {
        this.#user_uuid = user_uuid;
        this.#ip_address = ip_address;
        this.#useragent = useragent;
        this.#code = code;
    }

    toJSON() {
        return {
            user_uuid: this.#user_uuid,
            ip_address: this.#ip_address,
            useragent: this.#useragent,
            code: this.#code,
        };
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

    getCode() {
        return this.#code;
    }
}

export default UserAuthorizeInfoResponse;
