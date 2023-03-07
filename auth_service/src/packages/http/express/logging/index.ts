import ConfigMode from "@/config/ConfigMode";
import { Express } from "express";
import morgan from "morgan";

export default class LoggingMiddleware {
    #server: Express;

    #configMode: ConfigMode;

    constructor(server: Express, configMode: ConfigMode) {
        this.#server = server;
        this.#configMode = configMode;
    }

    register() {
        if (this.#configMode.isDevelopment()) {
            this.#server.use(
                morgan((tokens, req, res) => {
                    const start = "🚀";
                    const method = `${tokens.method(req, res)}`;
                    const status = `${tokens.status(req, res)}`;
                    const url = `${tokens.url(req, res)}`;
                    const responseTime = `${tokens["response-time"](
                        req,
                        res
                    )} ms`;
                    const date = `@ ${tokens.date(req, res)}`;
                    const remoteAddr = `${tokens["remote-addr"](req, res)}`;
                    const useragent = `${tokens["user-agent"](req, res)}`;
                    return [
                        "\n",
                        start,
                        method,
                        status,
                        url,
                        responseTime,
                        date,
                        remoteAddr,
                        useragent,
                        "\n",
                    ].join(" ");
                })
            );
            return;
        }
        this.#server.use(morgan("combined"));
    }
}
