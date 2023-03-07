import express, { Request, Response } from "express";

import HttpInput from "@/domain/http/HttpInput";
import HttpMethods from "@/domain/http/HttpMethods";
import HttpMiddleware from "@/domain/http/HttpMiddleware";
import HttpResponse from "@/domain/http/HttpResponse";
import HttpUserInput from "@/domain/http/HttpUserInput";

export default class ExpressHook {
    #router: express.Router;

    constructor(readonly router) {
        this.#router = router;
    }

    invoke(
        method: HttpMethods,
        path: string,
        callback: (input: HttpInput) => void,
        middlewares?: Array<(input: HttpMiddleware) => void>
    ) {
        return this.#router[method](
            path,
            middlewares?.map((middleware: (HttpMiddleware) => void) => {
                return async (req, res, next) => {
                    await middleware({
                        req,
                        res,
                        next,
                    } as HttpMiddleware);
                };
            }) ?? ((req, res, next) => next()),
            async (req: Request, res: Response) => {
                const result: any = await callback({
                    params: req.params ?? {},
                    body: req.body ?? {},
                    query: req.query ?? {},
                    headers: req.headers,
                    user: new HttpUserInput(req?.user ?? {}),
                    ip_address: req.ip,
                } as HttpInput);
                if (result instanceof HttpResponse) {
                    return res
                        .status(result.getStatus())
                        .json(result.getResult());
                }
                return res.json(result);
            }
        );
    }
}
