class UserRevokeTokenInput {
    user_uuid: string;

    refresh_token: string;

    constructor({ user_uuid = "", refresh_token = "" }) {
        this.user_uuid = user_uuid;
        this.refresh_token = refresh_token;
    }

    getUserUUID() {
        return this.user_uuid;
    }

    getRefreshToken() {
        return this.refresh_token;
    }
}

export default UserRevokeTokenInput;
