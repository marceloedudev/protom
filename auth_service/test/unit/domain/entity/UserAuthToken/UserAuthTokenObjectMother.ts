import UserAuthTokenDataBuilder from "./UserAuthTokenDataBuilder";

export default class UserAuthTokenObjectMother {
    static valid() {
        return UserAuthTokenDataBuilder.create()
            .withValidClientId()
            .withValidAccessToken()
            .withValidClientSecret()
            .build();
    }

    static invalid() {
        return UserAuthTokenDataBuilder.create()
            .withInvalidClientId()
            .withInvalidAccessToken()
            .withInvalidClientSecret()
            .build();
    }
}
