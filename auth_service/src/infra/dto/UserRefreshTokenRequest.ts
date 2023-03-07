import BadRequestException from "@/domain/errors/exceptions/BadRequestException";

class UserRefreshTokenRequest {
    #refresh_token: string;

    constructor(input) {
        if (!input || Object.keys(input)?.length === 0) {
            throw new BadRequestException(["Body is required"]);
        }
        const { refresh_token } = input;

        this.#refresh_token = refresh_token;
    }

    getRefreshToken() {
        return this.#refresh_token;
    }
}

export default UserRefreshTokenRequest;
