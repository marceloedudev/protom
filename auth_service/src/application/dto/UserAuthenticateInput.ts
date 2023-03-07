class UserAuthenticateInput {
    #email: string;

    #password: string;

    #ip_address: string;

    #useragent: string;

    constructor(input) {
        const {
            email = "",
            password = "",
            ip_address = "",
            useragent = "",
        } = input;
        this.#email = email;
        this.#password = password;
        this.#ip_address = ip_address;
        this.#useragent = useragent;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    getIPAddress() {
        return this.#ip_address;
    }

    getUseragent() {
        return this.#useragent;
    }
}

export default UserAuthenticateInput;
