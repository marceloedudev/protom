import UserToken from "@/domain/entity/UserToken";

export default class UserTokenDataBuilder {
    private data: any = {};

    public static create() {
        return new UserTokenDataBuilder();
    }

    withValidUserId() {
        this.data.user_id = 1;
        return this;
    }

    withValidUsername() {
        this.data.username = "username";
        return this;
    }

    withValidEmail() {
        this.data.email = "user@gmail.com";
        return this;
    }

    withValidFullname() {
        this.data.fullname = "Full name";
        return this;
    }

    withValidUserUUID() {
        this.data.user_uuid = "ccab14c1-bc12-401d-97f0-63272ab9f663";
        return this;
    }

    withValidAccessToken() {
        this.data.access_token = "4c079245-b157-42b8-9201-3f24d53d0e62";
        return this;
    }

    withValidRefreshToken() {
        this.data.refresh_token = "e38d8c37-e3b9-4acf-83fa-c24a3b66b4a4";
        return this;
    }

    withValidTokenCreatedAt() {
        this.data.token_created_at = new Date();
        return this;
    }

    //

    withInvalidUserId() {
        this.data.user_id = -1;
        return this;
    }

    withInvalidUsername() {
        this.data.username = "usr";
        return this;
    }

    withInvalidEmail() {
        this.data.email = "gmail.com";
        return this;
    }

    withInvalidFullname() {
        this.data.fullname = "name";
        return this;
    }

    withInvalidUserUUID() {
        this.data.user_uuid = "ccab1";
        return this;
    }

    withInvalidAccessToken() {
        this.data.access_token = "4c0792";
        return this;
    }

    withInvalidRefreshToken() {
        this.data.refresh_token = "e38d8c37";
        return this;
    }

    withInvalidTokenCreatedAt() {
        this.data.token_created_at = undefined;
        return this;
    }

    build() {
        return new UserToken({
            ...this.data,
        });
    }
}
