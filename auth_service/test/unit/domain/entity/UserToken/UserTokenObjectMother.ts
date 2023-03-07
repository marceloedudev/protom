import UserTokenDataBuilder from "./UserTokenDataBuilder";

export default class UserTokenObjectMother {
    public static valid() {
        return UserTokenDataBuilder.create()
            .withValidUserId()
            .withValidUsername()
            .withValidEmail()
            .withValidFullname()
            .withValidUserUUID()
            .withValidAccessToken()
            .withValidRefreshToken()
            .withValidTokenCreatedAt()
            .build();
    }

    public static invalid() {
        return UserTokenDataBuilder.create()
            .withInvalidUserId()
            .withInvalidUsername()
            .withInvalidEmail()
            .withInvalidFullname()
            .withInvalidUserUUID()
            .withInvalidAccessToken()
            .withInvalidRefreshToken()
            .withInvalidTokenCreatedAt()
            .build();
    }
}
