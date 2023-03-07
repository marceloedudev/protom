import HttpServerRoutes from "@/domain/http/HttpServerRoutes";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UserRoutes from "./user.routes";

export default class Routes {
    constructor(private readonly mainInjector: MainInjector) {}

    getRoutes(router: HttpServerRoutes) {
        router.group("/users", (routerRef) =>
            new UserRoutes(routerRef, this.mainInjector).execute()
        );
        return router;
    }
}
