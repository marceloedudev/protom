import UserAuthenticateDataBuilder from "./UserAuthenticateDataBuilder";

export default class UserAuthenticateObjectMother {
    public static valid() {
        return UserAuthenticateDataBuilder.create()
            .withValidEmail()
            .withValidPassword()
            .withValidIPAddress()
            .withValidUseragent()
            .build();
    }

    public static invalid() {
        return UserAuthenticateDataBuilder.create()
            .withInvalidEmail()
            .withInvalidPassword()
            .withInvalidIPAddress()
            .withInvalidUseragent()
            .build();
    }
}
