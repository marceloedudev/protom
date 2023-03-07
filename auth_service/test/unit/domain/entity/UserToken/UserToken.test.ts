/* eslint-disable no-unused-expressions */
import { describe, it } from "mocha";

import UserTokenObjectMother from "./UserTokenObjectMother";
import { expect } from "chai";

describe("UserToken", () => {
    it("should be create valid user token", () => {
        const userToken = UserTokenObjectMother.valid();
        userToken.validate();
        expect(userToken.getNotifications().length).to.be.equal(0);
    });

    it("should be create invalid user token", () => {
        const userToken = UserTokenObjectMother.invalid();
        userToken.validate();
        expect(userToken.getNotifications().length).to.be.equal(3);
    });
});
