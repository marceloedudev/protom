class SendEmailInput {
    email: string;

    fullname: string;

    content: string;

    constructor({ email = "", fullname = "", content = "" }) {
        this.email = email;
        this.fullname = fullname;
        this.content = content;
    }

    getEmail() {
        return this.email;
    }

    getFullname() {
        return this.fullname;
    }

    getContent() {
        return this.content;
    }
}

export default SendEmailInput;
