import UserAuthorizeDataBuilder from "./UserAuthorizeDataBuilder";

export default class UserAuthorizeObjectMother {
    static valid() {
        return UserAuthorizeDataBuilder.create()
            .withValidCode()
            .withValidUserUUID()
            .build();
    }

    static invalid() {
        return UserAuthorizeDataBuilder.create()
            .withInvalidCode()
            .withInvalidUserUUID()
            .build();
    }
}
