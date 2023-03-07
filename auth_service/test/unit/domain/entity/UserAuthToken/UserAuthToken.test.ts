import { describe, it } from "mocha";

import UserAuthTokenObjectMother from "./UserAuthTokenObjectMother";
import { expect } from "chai";

describe("UserAuthToken", () => {
    it("should be create invalid auth token", () => {
        const userAuthToken = UserAuthTokenObjectMother.invalid();
        userAuthToken.validate();
        expect(userAuthToken.getNotifications()).to.be.length(5);
    });

    it("should be create valid auth token", () => {
        const userAuthToken = UserAuthTokenObjectMother.valid();
        userAuthToken.validate();
        expect(userAuthToken.getNotifications()).to.be.length(0);
    });
});
