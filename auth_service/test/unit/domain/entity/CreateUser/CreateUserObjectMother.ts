import CreateUserDataBuilder from "./CreateUserDataBuilder";

export default class CreateUserObjectMother {
    public static valid() {
        return CreateUserDataBuilder.create()
            .withValidUsername()
            .withValidEmail()
            .withValidFullname()
            .withValidPassword()
            .build();
    }

    public static invalid() {
        return CreateUserDataBuilder.create()
            .withInvalidUsername()
            .withInvalidEmail()
            .withInvalidFullname()
            .withInvalidPassword()
            .build();
    }
}
