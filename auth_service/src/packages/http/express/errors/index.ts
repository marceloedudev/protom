/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express, NextFunction, Request, Response } from "express";

import AMPQException from "@/domain/errors/exceptions/AMPQException";
import ConfigMode from "@/config/ConfigMode";
import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import Exception from "@/domain/errors/exceptions/Exception";
import InternalServerException from "@/domain/errors/exceptions/InternalServerException";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";

export default class ErrorMiddleware {
    #server: Express;

    #dateAdapter: any;

    #errorTracking: ErrorTracking;

    #config: ConfigMode;

    constructor({ server, dateAdapter, errorTracking, config }) {
        this.#server = server;
        this.#dateAdapter = dateAdapter;
        this.#errorTracking = errorTracking;
        this.#config = config;
    }

    #base() {
        return (
            err: Error | Exception,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (err instanceof Exception) {
                return res.status(err.status).json({
                    ...err,
                    path: req.path,
                });
            }
            if (this.#config.isProduction()) {
                if (
                    err instanceof AMPQException ||
                    err instanceof DatabaseException ||
                    err instanceof InternalServerException
                ) {
                    this.#errorTracking.error(err, req);
                }
            }
            console.log({ err });
            return res.status(500).json({
                messages: ["Internal server error"],
                status: 500,
                error: "Internal Server Error",
                timestamp: this.#dateAdapter.now(),
                path: req.path,
            });
        };
    }

    #notFound() {
        return (req: Request, res: Response, next: NextFunction) => {
            throw new NotFoundException([`Route '${req.path}' was not found`]);
        };
    }

    register() {
        this.#server.use(this.#notFound()).use(this.#base());
    }
}
