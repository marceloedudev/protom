/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { serve, setup } from "swagger-ui-express";

import ConfigMode from "@/config/ConfigMode";
import { Express } from "express";
import SwaggerConfig from "@/docs/swagger/SwaggerConfig";

export default class SwaggerMiddleware {
    #server: Express;

    #config: ConfigMode;

    constructor(server: Express, config: ConfigMode) {
        this.#server = server;
        this.#config = config;
    }

    register() {
        if (!this.#config.isDevelopment()) {
            return;
        }
        this.#server.use("/swagger", serve, setup(SwaggerConfig()));
    }
}
