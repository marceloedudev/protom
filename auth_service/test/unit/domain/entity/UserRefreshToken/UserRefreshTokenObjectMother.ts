import UserRefreshTokenDataBuilder from "./UserRefreshTokenDataBuilder";

export default class UserRefreshTokenObjectMother {
    static valid() {
        return UserRefreshTokenDataBuilder.create()
            .withValidRefreshToken()
            .build();
    }

    static invalid() {
        return UserRefreshTokenDataBuilder.create()
            .withInvalidRefreshToken()
            .build();
    }
}
