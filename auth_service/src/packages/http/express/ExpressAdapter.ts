/* eslint-disable no-underscore-dangle */
import "./async-errors";

import ConfigHttp from "@/config/ConfigHttp";
import ConfigMode from "@/config/ConfigMode";
import ErrorMiddleware from "./errors";
import { ExpressAdapterRoutes } from "./ExpressAdapterRoutes";
import ExpressSubroutersListAll from "./ExpressSubroutersListAll";
import HttpServer from "@/domain/http/HttpServer";
import LoggingMiddleware from "./logging";
import SwaggerMiddleware from "./swagger";
import cors from "cors";
import express from "express";
import helmet from "helmet";

export default class ExpressAdapter implements HttpServer {
    #server;

    #listener;

    #errorMiddleware: ErrorMiddleware;

    #configMode: ConfigMode;

    #configHttp: ConfigHttp;

    #swagger: SwaggerMiddleware;

    #logging: LoggingMiddleware;

    #expressSubroutersListAll: ExpressSubroutersListAll;

    constructor({ configFactory, dateAdapter, errorTracking }) {
        this.#configMode = configFactory.createConfigMode();
        this.#configHttp = configFactory.createConfigHttp();
        this.#server = express();
        this.#errorMiddleware = new ErrorMiddleware({
            server: this.#server,
            dateAdapter,
            errorTracking,
            config: this.#configMode,
        });
        this.#swagger = new SwaggerMiddleware(this.#server, this.#configMode);
        this.#logging = new LoggingMiddleware(this.#server, this.#configMode);
        this.#expressSubroutersListAll = new ExpressSubroutersListAll();
    }

    config() {
        this.#swagger.register();
        this.#logging.register();
        this.#server
            .disable("x-powered-by")
            .use(express.json())
            .use((req, res, next) => {
                res.header("Content-Type", "application/json; charset=utf-8");
                next();
            })
            .use((req, res, next) => {
                res.setHeader("Surrogate-Control", "no-store");
                res.setHeader(
                    "Cache-Control",
                    "no-store, no-cache, must-revalidate, proxy-revalidate"
                );
                res.setHeader("Pragma", "no-cache");
                res.setHeader("Expires", "0");
                next();
            })
            .set("trust proxy", 1)
            .use(cors())
            .use(helmet());
        if (this.#configMode.isDevelopment()) {
            this.#server.get("/q/routes", (req, res) => {
                const routes = this.#expressSubroutersListAll.fetchRoutes(
                    this.#server._router
                );
                res.json({ routes });
            });
        }
        return this;
    }

    group(path: string, callback: (router: ExpressAdapterRoutes) => void) {
        const router = new ExpressAdapterRoutes();
        callback(router);
        this.#server.use(path, router.getRouter());
        return this;
    }

    errorHandlingMiddleware() {
        this.#errorMiddleware.register();
        return this;
    }

    listen(port?: number) {
        const newPort = port;
        this.#listener = this.#server.listen(
            newPort ?? this.#configHttp.port()
        );
        if (!this.#configMode.isTest()) {
            const { port: serverPort } = this.#listener.address();
            console.log(`Express listening on port ${serverPort}`);
        }
        return this.#listener;
    }

    getServer() {
        return this.#server;
    }

    closeServer() {
        if (!this.#listener) {
            return;
        }
        this.#listener.close(() => {
            console.log("HTTP server closed");
        });
    }
}
