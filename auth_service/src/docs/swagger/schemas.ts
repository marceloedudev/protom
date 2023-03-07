import { CreateUserRequestSchema } from "./schemas/CreateUserRequestSchema";
import { ExceptionSchema } from "./schemas/ExceptionSchema";
import { UserAuthTokenRequestSchema } from "./schemas/UserAuthTokenRequestSchema";
import { UserAuthTokenResponseSchema } from "./schemas/UserAuthTokenResponseSchema";
import { UserAuthenticateRequestSchema } from "./schemas/UserAuthenticateRequestSchema";
import { UserAuthorizeInfoResponseSchema } from "./schemas/UserAuthorizeInfoResponseSchema";
import { UserAuthorizeRequestSchema } from "./schemas/UserAuthorizeRequestSchema";
import { UserRefreshTokenRequestSchema } from "./schemas/UserRefreshTokenRequestSchema";
import { UserRevokeTokenRequestSchema } from "./schemas/UserRevokeTokenRequestSchema";
import { UserTokensResponseSchema } from "./schemas/UserTokensResponseSchema";

const getSchemas = () => {
    return {
        Exception: ExceptionSchema,
        UserAuthorizeRequest: UserAuthorizeRequestSchema,
        UserAuthenticateRequest: UserAuthenticateRequestSchema,
        UserTokensResponse: UserTokensResponseSchema,
        UserRefreshTokenRequest: UserRefreshTokenRequestSchema,
        UserRevokeTokenRequest: UserRevokeTokenRequestSchema,
        UserAuthTokenRequest: UserAuthTokenRequestSchema,
        UserAuthTokenResponse: UserAuthTokenResponseSchema,
        UserAuthorizeInfoResponse: UserAuthorizeInfoResponseSchema,
        CreateUserRequest: CreateUserRequestSchema,
    };
};

export default getSchemas;
