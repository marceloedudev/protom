class UserRevokeTokenOutput {
    #success: boolean;

    #message: string;

    constructor({ message }) {
        this.#success = true;
        this.#message = message;
    }

    getSuccess() {
        return this.#success;
    }

    getMessage() {
        return this.#message;
    }
}

export default UserRevokeTokenOutput;
