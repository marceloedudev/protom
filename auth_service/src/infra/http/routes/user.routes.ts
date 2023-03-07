import CreateUserController from "@/infra/controller/CreateUserController";
import HttpInput from "@/domain/http/HttpInput";
import HttpServerRoutes from "@/domain/http/HttpServerRoutes";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import MiddlewareFactory from "../factory/middleware";
import UserAuthTokenController from "@/infra/controller/UserAuthTokenController";
import UserAuthenticateController from "@/infra/controller/UserAuthenticateController";
import UserAuthorizeController from "@/infra/controller/UserAuthorizeController";
import UserAuthorizeInfoController from "@/infra/controller/UserAuthorizeInfoController";
import UserRefreshTokenController from "@/infra/controller/UserRefreshTokenController";
import UserRevokeTokenController from "@/infra/controller/UserRevokeTokenController";

export default class UserRoutes {
    private middlewareFactory: MiddlewareFactory;

    constructor(
        readonly router: HttpServerRoutes,
        private readonly mainInjector: MainInjector
    ) {
        this.middlewareFactory = new MiddlewareFactory(this.mainInjector);
    }

    execute() {
        this.router.post("/", (input: HttpInput) =>
            new CreateUserController(this.mainInjector).execute(input)
        );
        this.router.get(
            "/check",
            async ({ user }) => {
                return {
                    user: user?.getFullname(),
                };
            },
            [this.middlewareFactory.createVerifyTokenMiddleware().execute]
        );
        this.router.post("/authenticate", (input: HttpInput) =>
            new UserAuthenticateController(this.mainInjector).execute(input)
        );
        this.router.post("/authorize", (input: HttpInput) =>
            new UserAuthorizeController(this.mainInjector).execute(input)
        );
        this.router.patch("/refresh_tokens", (input: HttpInput) =>
            new UserRefreshTokenController(this.mainInjector).execute(input)
        );
        this.router.delete(
            "/:user_uuid/refresh_tokens/:token",
            (input: HttpInput) =>
                new UserRevokeTokenController(this.mainInjector).execute(input)
        );
        this.router.post("/tokens", (input: HttpInput) =>
            new UserAuthTokenController(this.mainInjector).execute(input)
        );
        this.router.get("/authorize", (input: HttpInput) =>
            new UserAuthorizeInfoController(this.mainInjector).execute(input)
        );
        return this.router;
    }
}
