import Exception from "./Exception";

export default class AMPQException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 500, "AMPQ Exception");
    }
}
