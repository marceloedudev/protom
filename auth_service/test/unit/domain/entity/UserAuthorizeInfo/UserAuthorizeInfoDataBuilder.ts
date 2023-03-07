import UserAuthorizeInfo from "@/domain/entity/UserAuthorizeInfo";

export default class UserAuthorizeInfoDataBuilder {
    #data: any = {};

    static create() {
        return new UserAuthorizeInfoDataBuilder();
    }

    withValidCode() {
        this.#data.code = "561090";
        return this;
    }

    withValidUserUUID() {
        this.#data.user_uuid = "1a21605c-0cc0-44de-afcf-e2614135d48e";
        return this;
    }

    withInvalidCode() {
        this.#data.code = "";
        return this;
    }

    withInvalidUserUUID() {
        this.#data.user_uuid = "";
        return this;
    }

    build() {
        return new UserAuthorizeInfo({
            ...this.#data,
        });
    }
}
