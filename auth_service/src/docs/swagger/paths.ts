import { UserAuthTokenPath } from "./paths/UserAuthTokenPath";
import { UserAuthenticatePath } from "./paths/UserAuthenticatePath";
import { UserAuthorizePath } from "./paths/UserAuthorizePath";
import { UserPath } from "./paths/UserPath";
import { UserRefreshTokenPath } from "./paths/UserRefreshTokenPath";
import { UserRevokeTokenPath } from "./paths/UserRevokeTokenPath";

const getPaths = () => {
    return {
        "/users/authenticate": UserAuthenticatePath,
        "/users/authorize": UserAuthorizePath,
        "/users/refresh_token": UserRefreshTokenPath,
        "/users/tokens": UserAuthTokenPath,
        "/users/{user_uuid}/refresh_tokens/{refresh_token}":
            UserRevokeTokenPath,
        "/users": UserPath,
    };
};

export default getPaths;
