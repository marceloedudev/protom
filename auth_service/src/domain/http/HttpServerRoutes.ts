import HttpInput from "./HttpInput";
import HttpMiddleware from "./HttpMiddleware";

export default interface HttpServerRoutes {
    getRouter();
    group(path: string, callback: (router: HttpServerRoutes) => void);
    get(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    );
    post(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    );
    put(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    );
    delete(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    );
    patch(
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    );
}
