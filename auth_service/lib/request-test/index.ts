import supertest from "supertest";

export default class RequestTest {
    #instance: supertest.SuperTest<supertest.Test> & any;

    #response;

    constructor(server) {
        this.#setInstance(supertest.agent(server));
        this.set("User-agent", "some agent");
    }

    #setResponse(request) {
        this.#response = request;
    }

    #getResponse() {
        return this.#response;
    }

    #setInstance(instance) {
        this.#instance = instance;
    }

    #getInstance() {
        return this.#instance;
    }

    static setServer(server) {
        return new RequestTest(server);
    }

    get(url: string) {
        this.#setResponse(this.#getInstance().get(url));
        this.#setInstance(this.#getResponse());
        return this;
    }

    post(url: string) {
        this.#setResponse(this.#getInstance().post(url));
        this.#setInstance(this.#getResponse());
        return this;
    }

    put(url: string) {
        this.#setResponse(this.#getInstance().put(url));
        this.#setInstance(this.#getResponse());
        return this;
    }

    delete(url: string) {
        this.#setResponse(this.#getInstance().delete(url));
        this.#setInstance(this.#getResponse());
        return this;
    }

    patch(url: string) {
        this.#setResponse(this.#getInstance().patch(url));
        this.#setInstance(this.#getResponse());
        return this;
    }

    set(key: string, value: string) {
        this.#setInstance(this.#getInstance().set(key, value));
        return this;
    }

    send(value: any) {
        this.#setInstance(this.#getInstance().send(value));
        return this;
    }

    build() {
        return this.#response;
    }
}
