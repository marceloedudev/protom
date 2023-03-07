export default class FakerName {
    constructor(private readonly fakerName) {}

    findName() {
        return this.fakerName.findName();
    }

    firstName() {
        return this.fakerName.firstName();
    }

    fullName() {
        const firstName = this.fakerName.firstName();
        const lastName = this.fakerName.lastName();
        return `${firstName} ${lastName}`;
    }

    fullNameEx() {
        return this.fakerName.fullName();
    }

    gender() {
        return this.fakerName.gender();
    }

    jobArea() {
        return this.fakerName.jobArea();
    }

    jobDescriptor() {
        return this.fakerName.jobDescriptor();
    }

    jobTitle() {
        return this.fakerName.jobTitle();
    }

    jobType() {
        return this.fakerName.jobType();
    }

    lastName() {
        return this.fakerName.lastName();
    }

    middleName() {
        return this.fakerName.middleName();
    }

    prefix() {
        return this.fakerName.prefix();
    }

    sex() {
        return this.fakerName.sex();
    }

    sexType() {
        return this.fakerName.sexType();
    }

    suffix() {
        return this.fakerName.suffix();
    }
}
