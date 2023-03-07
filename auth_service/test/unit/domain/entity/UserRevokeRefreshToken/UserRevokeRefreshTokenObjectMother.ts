import UserRevokeRefreshTokenDataBuilder from "./UserRevokeRefreshTokenDataBuilder";

export default class UserRefreshTokenObjectMother {
    static valid() {
        return UserRevokeRefreshTokenDataBuilder.create()
            .withValidUserUUID()
            .withValidRefreshToken()
            .build();
    }

    static invalid() {
        return UserRevokeRefreshTokenDataBuilder.create()
            .withInvalidUserUUID()
            .withInvalidRefreshToken()
            .build();
    }
}
