/* eslint-disable import/order */
import ExpressHook from "./ExpressHook";
import HttpInput from "@/domain/http/HttpInput";
import HttpMiddleware from "@/domain/http/HttpMiddleware";
import HttpServerRoutes from "@/domain/http/HttpServerRoutes";
import express from "express";

export class ExpressAdapterRoutes implements HttpServerRoutes {
    #router: express.Router;

    #hook: ExpressHook;

    constructor() {
        this.#router = express.Router({ mergeParams: true });
        this.#hook = new ExpressHook(this.#router);
    }

    getRouter() {
        return this.#router;
    }

    group(path: string, callback: (router: ExpressAdapterRoutes) => void) {
        const router = new ExpressAdapterRoutes();
        callback(router);
        return this.#router.use(path, router.getRouter());
    }

    get(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#hook.invoke("get", path, callback, middlewares);
    }

    post(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#hook.invoke("post", path, callback, middlewares);
    }

    put(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#hook.invoke("put", path, callback, middlewares);
    }

    delete(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#hook.invoke("delete", path, callback, middlewares);
    }

    patch(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#hook.invoke("patch", path, callback, middlewares);
    }
}
