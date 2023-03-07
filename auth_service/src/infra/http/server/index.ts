import ConfigHttp from "@/config/ConfigHttp";
import ExpressAdapter from "@/packages/http/express/ExpressAdapter";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import Routes from "../routes";

export default class HttpServer {
    #configHttp: ConfigHttp;

    constructor(private readonly mainInjector: MainInjector) {
        this.#configHttp = this.mainInjector
            .getConfigFactory()
            .createConfigHttp();
    }

    execute() {
        const server = new ExpressAdapter({
            configFactory: this.mainInjector.getConfigFactory(),
            dateAdapter: this.mainInjector.getDateAdapter(),
            errorTracking: this.mainInjector.getErrorTracking(),
        });
        server
            .config()
            .group(`${this.#configHttp.path()}`, (router) =>
                new Routes(this.mainInjector).getRoutes(router)
            )
            .errorHandlingMiddleware()
            .listen();
        return server;
    }
}
