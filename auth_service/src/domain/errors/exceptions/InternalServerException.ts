import Exception from "./Exception";

class InternalServerException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 500, "Internal Server Error");
    }
}

export default InternalServerException;
