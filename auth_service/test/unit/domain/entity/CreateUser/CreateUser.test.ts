/* eslint-disable no-unused-expressions */
import { describe, it } from "mocha";

import CreateUserObjectMother from "./CreateUserObjectMother";
import { expect } from "chai";

describe("CreateUser", () => {
    it("should be create valid user", () => {
        const createUser = CreateUserObjectMother.valid();
        createUser.validate();
        expect(createUser.getNotifications().length).to.be.equal(0);
        expect(createUser.getActive()).to.be.false;
        expect(createUser.getEmailVerified()).to.be.false;
    });

    it("should be create invalid user", () => {
        const createUser = CreateUserObjectMother.invalid();
        createUser.validate();
        expect(createUser.getNotifications().length).to.be.equal(4);
    });
});
