import BadRequestException from "@/domain/errors/exceptions/BadRequestException";

class CreateUserRequest {
    username: string;

    email: string;

    fullname: string;

    password: string;

    constructor(input) {
        if (!input || Object.keys(input)?.length === 0) {
            throw new BadRequestException(["Body is required"]);
        }
        const { username, email, fullname, password } = input;
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

export default CreateUserRequest;
