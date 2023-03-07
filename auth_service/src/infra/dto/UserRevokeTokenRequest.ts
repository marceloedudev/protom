import BadRequestException from "@/domain/errors/exceptions/BadRequestException";

class UserRevokeTokenRequest {
    #user_uuid: string;

    #refresh_token: string;

    constructor(input) {
        if (!input || Object.keys(input)?.length === 0) {
            throw new BadRequestException(["Body is required"]);
        }
        const { user_uuid, refresh_token } = input;
        this.#user_uuid = user_uuid;
        this.#refresh_token = refresh_token;
    }

    getUserUUID() {
        return this.#user_uuid;
    }

    getRefreshToken() {
        return this.#refresh_token;
    }
}

export default UserRevokeTokenRequest;
