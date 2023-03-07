export default class UserPasscode {
    #user_uuid: string;

    #ip_address: string;

    #useragent: string;

    #user_id: number;

    #code: string;

    #expire_time: number;

    constructor({
        user_uuid,
        ip_address,
        useragent,
        user_id,
        code,
        expire_time,
    }) {
        this.#user_uuid = user_uuid;
        this.#ip_address = ip_address;
        this.#useragent = useragent;
        this.#user_id = user_id;
        this.#code = code;
        this.#expire_time = expire_time;
    }

    toDataStorage() {
        return {
            user_uuid: this.#user_uuid,
            ip_address: this.#ip_address,
            useragent: this.#useragent,
            user_id: this.#user_id,
            code: this.#code,
            expire_time: this.#expire_time,
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

    getUserId() {
        return this.#user_id;
    }

    getCode() {
        return this.#code;
    }

    getExpireTime() {
        return this.#expire_time;
    }
}
