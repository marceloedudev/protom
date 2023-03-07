import HttpServerRoutes from "./HttpServerRoutes";

export default interface HttpServer {
    config();
    group(path: string, callback: (router: HttpServerRoutes) => void);
    errorHandlingMiddleware();
    listen(port: number);
    getServer();
}
