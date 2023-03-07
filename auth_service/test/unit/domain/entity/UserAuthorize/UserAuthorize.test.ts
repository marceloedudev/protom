import { describe, it } from "mocha";

import UserAuthorizeObjectMother from "./UserAuthorizeObjectMother";
import { expect } from "chai";

describe("UserAuthorize", () => {
    it("should be create invalid user authorize", () => {
        const userAuthorize = UserAuthorizeObjectMother.invalid();
        userAuthorize.validate();
        expect(userAuthorize.getNotifications()).to.be.length(2);
    });

    it("should be create valid user authorize", () => {
        const userAuthorize = UserAuthorizeObjectMother.valid();
        userAuthorize.validate();
        expect(userAuthorize.getNotifications()).to.be.length(0);
    });
});
