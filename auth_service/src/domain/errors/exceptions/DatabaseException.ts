import Exception from "./Exception";

export default class DatabaseException extends Exception {
    constructor(messages: Array<string>, error) {
        super(messages, 500, "Database Exception");
        console.log({ errorMessage: error?.message });
    }
}
