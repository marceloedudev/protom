import UserRevokeRefreshToken from "@/domain/entity/UserRevokeRefreshToken";

export default class UserRevokeRefreshTokenDataBuilder {
    #data: any = {};

    constructor() {}

    static create() {
        return new UserRevokeRefreshTokenDataBuilder();
    }

    withValidUserUUID() {
        this.#data.user_uuid = "1a21605c-0cc0-44de-afcf-e2614135d48e";
        return this;
    }

    withValidRefreshToken() {
        this.#data.refresh_token = "1a21605c-0cc0-44de-afcf-e2614135d48e";
        return this;
    }

    withInvalidRefreshToken() {
        this.#data.refresh_token = "";
        return this;
    }

    withInvalidUserUUID() {
        this.#data.user_uuid = "";
        return this;
    }

    build() {
        return new UserRevokeRefreshToken({
            ...this.#data,
        });
    }
}
