export default class HttpResponse {
    #status: number;

    #result: any;

    constructor({ status, result }: { status: number; result?: any }) {
        this.#status = status;
        this.#result = result;
    }

    getStatus() {
        return this.#status;
    }

    getResult() {
        return this.#result;
    }
}
