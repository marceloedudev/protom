/* eslint-disable no-unused-expressions */
import { describe, it } from "mocha";

import UserAuthenticateObjectMother from "./UserAuthenticateObjectMother";
import { expect } from "chai";

describe("UserAuthenticate", () => {
    it("should be create invalid user authenticate", () => {
        const userAuthenticate = UserAuthenticateObjectMother.invalid();
        userAuthenticate.validate();
        expect(userAuthenticate.getNotifications().length).to.be.equal(5);
    });

    it("should be create valid user authenticate", () => {
        const userAuthenticate = UserAuthenticateObjectMother.valid();
        userAuthenticate.validate();
        expect(userAuthenticate.getNotifications().length).to.be.equal(0);
    });
});
