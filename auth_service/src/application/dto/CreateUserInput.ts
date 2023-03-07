class CreateUserInput {
    username: string;

    email: string;

    fullname: string;

    password: string;

    constructor({ username = "", email = "", fullname = "", password = "" }) {
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getFullname() {
        return this.fullname;
    }

    getPassword() {
        return this.password;
    }
}

export default CreateUserInput;
