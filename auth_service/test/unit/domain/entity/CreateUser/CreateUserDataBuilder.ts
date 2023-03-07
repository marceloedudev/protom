import CreateUser from "@/domain/entity/CreateUser";

export default class CreateUserDataBuilder {
    private data: any = {};

    public static create() {
        return new CreateUserDataBuilder();
    }

    withValidUsername() {
        this.data.username = "username";
        return this;
    }

    withValidEmail() {
        this.data.email = "user@gmail.com";
        return this;
    }

    withValidFullname() {
        this.data.fullname = "Full name";
        return this;
    }

    withValidPassword() {
        this.data.password = "123456wASD";
        return this;
    }

    //

    withInvalidUsername() {
        this.data.username = "usr";
        return this;
    }

    withInvalidEmail() {
        this.data.email = "gmail.com";
        return this;
    }

    withInvalidFullname() {
        this.data.fullname = "name";
        return this;
    }

    withInvalidPassword() {
        this.data.password = "1234";
        return this;
    }

    build() {
        return new CreateUser({
            ...this.data,
        });
    }
}
