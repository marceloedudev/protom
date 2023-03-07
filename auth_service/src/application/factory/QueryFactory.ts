import MainInjector from "@/domain/dependency-injection/MainInjector";
import UserAuthTokenQuery from "../queries/UserAuthTokenQuery";
import UserAuthorizeInfoQuery from "../queries/UserAuthorizeInfoQuery";

class QueryFactory {
    constructor(private readonly mainInjector: MainInjector) {}

    createUserAuthToken() {
        return new UserAuthTokenQuery(this.mainInjector);
    }

    createUserAuthorizeInfo() {
        return new UserAuthorizeInfoQuery(this.mainInjector);
    }
}

export default QueryFactory;
