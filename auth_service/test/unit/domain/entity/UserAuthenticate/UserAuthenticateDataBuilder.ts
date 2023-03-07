import UserAuthenticate from "@/domain/entity/UserAuthenticate";

export default class UserAuthenticateDataBuilder {
    private data: any = {};

    public static create() {
        return new UserAuthenticateDataBuilder();
    }

    withValidEmail() {
        this.data.email = "user@gmail.com";
        return this;
    }

    withValidPassword() {
        this.data.password = "123456wASD";
        return this;
    }

    withValidIPAddress() {
        this.data.ip_address = "127.0.0.1";
        return this;
    }

    withValidUseragent() {
        this.data.useragent = "insomnia/2022.6.0";
        return this;
    }

    //

    withInvalidEmail() {
        this.data.email = "gmail.com";
        return this;
    }

    withInvalidPassword() {
        this.data.password = "1234";
        return this;
    }

    withInvalidIPAddress() {
        this.data.ip_address = "ip";
        return this;
    }

    withInvalidUseragent() {
        this.data.useragent = "";
        return this;
    }

    build() {
        return new UserAuthenticate({
            ...this.data,
        });
    }
}
