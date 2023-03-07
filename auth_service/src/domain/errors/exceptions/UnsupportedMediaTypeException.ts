import Exception from "./Exception";

class UnsupportedMediaTypeException extends Exception {
    constructor(messages: Array<string>) {
        super(messages, 415, "Unsupported Media Type");
    }
}

export default UnsupportedMediaTypeException;
