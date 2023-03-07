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
import UserRefreshTokenInput from "@/application/dto/UserRefreshTokenInput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserRefreshTokenUsecase", () => {
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

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should throw an error when trying to update a non-existent token", async () => {
        try {
            await usecaseFactory.createUserRefreshToken().execute(
                new UserRefreshTokenInput({
                    refresh_token: faker.datatype().uuid(),
                })
            );
            expect.fail();
        } catch (error: any) {
            expect(error.status).to.be.equal(404);
            expect(error.messages.length).to.be.equal(1);
        }
    });

    it("should update a valid token", async () => {
        const output = await usecaseFactory.createUserRefreshToken().execute(
            new UserRefreshTokenInput({
                refresh_token: `${authorizeOutput.getRefreshToken()}`,
            })
        );
        expect(output.getUserUUID()).to.not.null;
        expect(output.getAccessToken()).to.not.null;
        expect(output.getExpiresIn()).to.not.null;
        expect(output.getTokenType()).to.not.null;
        expect(output.getRefreshToken()).to.not.null;
    });
});
