import express from "express";

export default interface HttpMiddleware {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
}
