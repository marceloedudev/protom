import UserAuthorizeInfoDataBuilder from "./UserAuthorizeInfoDataBuilder";

export default class UserAuthorizeInfoObjectMother {
    static valid() {
        return UserAuthorizeInfoDataBuilder.create()
            .withValidCode()
            .withValidUserUUID()
            .build();
    }

    static invalid() {
        return UserAuthorizeInfoDataBuilder.create()
            .withInvalidCode()
            .withInvalidUserUUID()
            .build();
    }
}
