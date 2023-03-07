import Exception from "./Exception";

class NotFoundException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 404, "Not Found");
    }
}
export default NotFoundException;
