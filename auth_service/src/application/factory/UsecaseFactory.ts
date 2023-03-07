import CreateUserUsecase from "../usecase/CreateUserUsecase";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UserAuthenticateUsecase from "../usecase/UserAuthenticateUsecase";
import UserAuthorizeUsecase from "../usecase/UserAuthorizeUsecase";
import UserRefreshTokenUsecase from "../usecase/UserRefreshTokenUsecase";
import UserRevokeRefreshTokenUsecase from "../usecase/UserRevokeRefreshTokenUsecase";

class UsecaseFactory {
    constructor(private readonly mainInjector: MainInjector) {}

    createUserAuthorize() {
        return new UserAuthorizeUsecase(this.mainInjector);
    }

    createUserRevokeRefreshToken() {
        return new UserRevokeRefreshTokenUsecase(this.mainInjector);
    }

    createUserRefreshToken() {
        return new UserRefreshTokenUsecase(this.mainInjector);
    }

    createUserUsecase() {
        return new CreateUserUsecase(this.mainInjector);
    }

    createUserAuthenticate() {
        return new UserAuthenticateUsecase(this.mainInjector);
    }
}

export default UsecaseFactory;
