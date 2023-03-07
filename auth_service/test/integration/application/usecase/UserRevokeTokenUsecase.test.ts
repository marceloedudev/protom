/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import UserAuthorizeOutput from "@/application/dto/UserAuthorizeOutput";
import UserRevokeTokenInput from "@/application/dto/UserRevokeTokenInput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserRevokeTokenUsecase", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    let authorizeOutput: UserAuthorizeOutput;
    const faker = new FakerAdapter();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;
    let usecaseFactory: UsecaseFactory;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
        await serverBoot.addConsumer();
        usecaseFactory = serverBoot.getMainInjector().getUsecaseFactory();
        await usecaseFactory.createUserUsecase().execute(
            new CreateUserInput({
                username: faker.internet().userName(),
                email: userEmail,
                fullname: faker.name().fullName(),
                password: userPassword,
            })
        );
        const authenticateOutput: UserAuthenticateOutput = await usecaseFactory
            .createUserAuthenticate()
            .execute(
                new UserAuthenticateInput({
                    email: userEmail,
                    password: userPassword,
                    ip_address: faker.internet().ip(),
                    useragent: faker.internet().userAgent(),
                })
            );
        authorizeOutput = await usecaseFactory.createUserAuthorize().execute(
            new UserAuthorizeInput({
                code: `${authenticateOutput.getCode()}`,
                user_uuid: `${authenticateOutput.getUserUUID()}`,
            })
        );
    });

    after(async () => {
        await serverBoot.destroyAll();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should delete a valid token", async () => {
        const userUUID = authorizeOutput.getUserUUID();
        const refreshToken = authorizeOutput.getRefreshToken();
        const output = await usecaseFactory
            .createUserRevokeRefreshToken()
            .execute(
                new UserRevokeTokenInput({
                    user_uuid: userUUID,
                    refresh_token: refreshToken,
                })
            );
        expect(output.getSuccess()).to.be.true;
    });
});
