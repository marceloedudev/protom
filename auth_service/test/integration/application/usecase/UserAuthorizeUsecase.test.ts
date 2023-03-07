/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthorizeUsecase", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    let authenticateOutput: UserAuthenticateOutput;
    const faker = new FakerAdapter();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;
    let usecaseFactory: UsecaseFactory;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
        const injector = serverBoot.getMainInjector();
        usecaseFactory = injector.getUsecaseFactory();
    });

    after(async () => {
        await serverBoot.destroyAll();
    });

    beforeEach(async () => {
        sandbox = sinon.createSandbox();

        await usecaseFactory.createUserUsecase().execute(
            new CreateUserInput({
                username: faker.internet().userName(),
                email: userEmail,
                fullname: faker.name().fullName(),
                password: userPassword,
            })
        );
        authenticateOutput = await usecaseFactory
            .createUserAuthenticate()
            .execute(
                new UserAuthenticateInput({
                    email: userEmail,
                    password: userPassword,
                    ip_address: faker.internet().ip(),
                    useragent: faker.internet().userAgent(),
                })
            );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should allow account access", async () => {
        const output = await usecaseFactory.createUserAuthorize().execute(
            new UserAuthorizeInput({
                code: `${authenticateOutput.getCode()}`,
                user_uuid: `${authenticateOutput.getUserUUID()}`,
            })
        );
        expect(output.getUserUUID()).to.not.null;
        expect(output.getAccessToken()).to.not.null;
        expect(output.getExpiresIn()).to.not.null;
        expect(output.getTokenType()).to.not.null;
        expect(output.getRefreshToken()).to.not.null;
    });
});
