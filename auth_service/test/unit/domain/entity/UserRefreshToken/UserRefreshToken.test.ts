/* eslint-disable no-unused-expressions */
import { describe, it } from "mocha";

import UserRefreshTokenObjectMother from "./UserRefreshTokenObjectMother";
import { expect } from "chai";

describe("UserRefreshToken", () => {
    it("should be create valid refresh token", () => {
        const userRefreshToken = UserRefreshTokenObjectMother.valid();
        userRefreshToken.validate();
        expect(userRefreshToken.getNotifications().length).to.be.equal(0);
    });

    it("should be create invalid refresh token", () => {
        const userRefreshToken = UserRefreshTokenObjectMother.invalid();
        userRefreshToken.validate();
        expect(userRefreshToken.getNotifications().length).to.be.equal(1);
    });
});
