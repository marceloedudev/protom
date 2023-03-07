import BadRequestException from "@/domain/errors/exceptions/BadRequestException";

export default class UserAuthenticateRequest {
    #email: string;

    #password: string;

    constructor(input) {
        if (!input || Object.keys(input)?.length === 0) {
            throw new BadRequestException(["Body is required"]);
        }
        const { email, password } = input;
        this.#email = email;
        this.#password = password;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }
}
