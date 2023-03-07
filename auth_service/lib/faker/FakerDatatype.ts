export default class FakerDatatype {
    constructor(private readonly fakerDatatype) {}

    array() {
        return this.fakerDatatype.array();
    }

    bigInt() {
        return this.fakerDatatype.bigInt();
    }

    boolean() {
        return this.fakerDatatype.boolean();
    }

    datetime() {
        return this.fakerDatatype.datetime();
    }

    float() {
        return this.fakerDatatype.float();
    }

    hexadecimal() {
        return this.fakerDatatype.hexadecimal();
    }

    json() {
        return this.fakerDatatype.json();
    }

    number() {
        return this.fakerDatatype.number();
    }

    string() {
        return this.fakerDatatype.string();
    }

    uuid() {
        return this.fakerDatatype.uuid();
    }
}
