export default class FakerInternet {
    constructor(private readonly fakerInternet) {}

    avatar() {
        return this.fakerInternet.avatar();
    }

    color() {
        return this.fakerInternet.color();
    }

    domainName() {
        return this.fakerInternet.domainName();
    }

    domainSuffix() {
        return this.fakerInternet.domainSuffix();
    }

    domainWord() {
        return this.fakerInternet.domainWord();
    }

    email() {
        return this.fakerInternet.email();
    }

    emoji() {
        return this.fakerInternet.emoji();
    }

    exampleEmail() {
        return this.fakerInternet.exampleEmail();
    }

    httpMethod() {
        return this.fakerInternet.httpMethod();
    }

    httpStatusCode() {
        return this.fakerInternet.httpStatusCode();
    }

    ip() {
        return this.fakerInternet.ip();
    }

    ipv4() {
        return this.fakerInternet.ipv4();
    }

    ipv6() {
        return this.fakerInternet.ipv6();
    }

    mac() {
        return this.fakerInternet.mac();
    }

    password() {
        return this.fakerInternet.password(20, false, /[0-9a-zA-Z]/, "1Wd");
    }

    port() {
        return this.fakerInternet.port();
    }

    protocol() {
        return this.fakerInternet.protocol();
    }

    url() {
        return this.fakerInternet.url();
    }

    userAgent() {
        return this.fakerInternet.userAgent();
    }

    userName() {
        const username = this.fakerInternet.userName();
        return username.toLowerCase();
    }
}
