import Exception from "./Exception";

class UnauthorizedException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 401, "Unauthorized");
    }
}

export default UnauthorizedException;
