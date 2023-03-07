import Exception from "./Exception";

class ConflictException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 409, "Conflict");
    }
}

export default ConflictException;
