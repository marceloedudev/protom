import Exception from "./Exception";

class BadRequestException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 400, "Bad Request");
    }
}

export default BadRequestException;
