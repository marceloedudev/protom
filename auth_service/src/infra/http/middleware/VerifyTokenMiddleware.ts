import BearerToken from "@/domain/entity/BearerToken";
import ForbiddenException from "@/domain/errors/exceptions/ForbiddenException";
import HttpMiddleware from "@/domain/http/HttpMiddleware";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import UnauthorizedException from "@/domain/errors/exceptions/UnauthorizedException";
import UserAuthTokenInput from "@/application/dto/UserAuthTokenInput";

export default class VerifyTokenMiddleware {
    constructor(private readonly mainInjector: MainInjector) {}

    public execute = async ({ req, next }: HttpMiddleware) => {
        const bearerHeader = req.headers?.authorization;
        const bearerToken = new BearerToken(bearerHeader);
        if (bearerToken.validate()) {
            throw new ForbiddenException(bearerToken.getNotifications());
        }
        try {
            const authToken = await this.mainInjector
                .getQueryFactory()
                .createUserAuthToken()
                .execute(
                    new UserAuthTokenInput({
                        client_id: "auth_service",
                        client_secret: "ccab14c1-bc12-401d-97f0-63272ab9f663",
                        access_token: bearerToken.getToken(),
                    })
                );
            req.user = {
                user_id: authToken.getUserId(),
                username: authToken.getUsername(),
                email: authToken.getEmail(),
                fullname: authToken.getFullname(),
                user_uuid: authToken.getUserUUID(),
            };
            next();
        } catch (error) {
            throw new UnauthorizedException(["Unauthorized"]);
        }
    };
}
