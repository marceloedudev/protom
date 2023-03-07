/* eslint-disable no-unused-expressions */
import { describe, it } from "mocha";

import UserRevokeRefreshTokenObjectMother from "./UserRevokeRefreshTokenObjectMother";
import { expect } from "chai";

describe("UserRevokeRefreshToken", () => {
    it("should be create valid user revoke token", () => {
        const userRevokeRefreshToken =
            UserRevokeRefreshTokenObjectMother.valid();
        userRevokeRefreshToken.validate();
        expect(userRevokeRefreshToken.getNotifications().length).to.be.equal(0);
    });

    it("should be create invalid user revoke token", () => {
        const userRevokeRefreshToken =
            UserRevokeRefreshTokenObjectMother.invalid();
        userRevokeRefreshToken.validate();
        expect(userRevokeRefreshToken.getNotifications().length).to.be.equal(2);
    });
});
