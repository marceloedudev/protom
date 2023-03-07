import UserAuthToken from "@/domain/entity/UserAuthToken";

export default class UserAuthTokenDataBuilder {
    #userAuthTokenData = {} as UserAuthToken;

    constructor() {
        this.#userAuthTokenData = new UserAuthToken();
    }

    static create() {
        return new UserAuthTokenDataBuilder();
    }

    withValidClientId() {
        this.#userAuthTokenData.setClientId("order_service");
        return this;
    }

    withValidClientSecret() {
        this.#userAuthTokenData.setClientSecret(
            "ccab14c1-bc12-401d-97f0-63272ab9f663"
        );
        return this;
    }

    withValidAccessToken() {
        this.#userAuthTokenData.setAccessToken(
            "f5ae6aa2-4014-41b2-9ebe-e367f7309dcd"
        );
        return this;
    }

    withInvalidClientId() {
        this.#userAuthTokenData.setClientId(null as any);
        return this;
    }

    withInvalidClientSecret() {
        this.#userAuthTokenData.setClientSecret(null as any);
        return this;
    }

    withInvalidAccessToken() {
        this.#userAuthTokenData.setAccessToken(null as any);
        return this;
    }

    build() {
        return this.#userAuthTokenData;
    }
}
