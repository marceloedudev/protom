import UserRefreshToken from "@/domain/entity/UserRefreshToken";

export default class UserRefreshTokenDataBuilder {
    #data: any = {};

    constructor() {}

    static create() {
        return new UserRefreshTokenDataBuilder();
    }

    withValidRefreshToken() {
        this.#data.refresh_token = "1a21605c-0cc0-44de-afcf-e2614135d48e";
        return this;
    }

    withInvalidRefreshToken() {
        this.#data.refresh_token = "";
        return this;
    }

    build() {
        return new UserRefreshToken({
            ...this.#data,
        });
    }
}
