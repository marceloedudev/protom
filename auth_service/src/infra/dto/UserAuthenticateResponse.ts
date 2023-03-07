export default class UserAuthenticateResponse {
    #user_uuid: string;

    constructor({ user_uuid }) {
        this.#user_uuid = user_uuid;
    }

    toJSON() {
        return {
            user_uuid: this.#user_uuid,
        };
    }
}
