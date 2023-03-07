import Exception from "./Exception";

class ForbiddenException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 403, "Forbidden");
    }
}

export default ForbiddenException;
