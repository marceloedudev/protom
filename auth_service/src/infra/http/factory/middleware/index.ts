import MainInjector from "@/domain/dependency-injection/MainInjector";
import VerifyTokenMiddleware from "../../middleware/VerifyTokenMiddleware";

export default class MiddlewareFactory {
    constructor(private readonly mainInjector: MainInjector) {}

    createVerifyTokenMiddleware() {
        return new VerifyTokenMiddleware(this.mainInjector);
    }
}
