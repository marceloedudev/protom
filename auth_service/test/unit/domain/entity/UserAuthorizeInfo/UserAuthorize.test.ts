import { describe, it } from "mocha";

import UserAuthorizeInfoObjectMother from "./UserAuthorizeInfoObjectMother";
import { expect } from "chai";

describe("UserAuthorizeInfo", () => {
    it("should be create invalid user authorize info", () => {
        const userAuthorize = UserAuthorizeInfoObjectMother.invalid();
        userAuthorize.validate();
        expect(userAuthorize.getNotifications()).to.be.length(2);
    });

    it("should be create valid user authorize info", () => {
        const userAuthorize = UserAuthorizeInfoObjectMother.valid();
        userAuthorize.validate();
        expect(userAuthorize.getNotifications()).to.be.length(0);
    });
});
