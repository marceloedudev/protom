import BadRequestException from "@/domain/errors/exceptions/BadRequestException";

export default class UserAuthorizeRequest {
    #code: string;

    #user_uuid: string;

    constructor(input) {
        if (!input || Object.keys(input)?.length === 0) {
            throw new BadRequestException(["Body is required"]);
        }
        const { code, user_uuid } = input;
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
