/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../lib/faker/FakerAdapter";
import RequestTest from "../../../lib/request-test";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthorize E2E", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const routePathBase = "/auth/v1";
    let authenticateOutput: UserAuthenticateOutput;
    const faker = new FakerAdapter();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
    });

    after(async () => {
        await serverBoot.destroyAll();
    });

    beforeEach(async () => {
        sandbox = sinon.createSandbox();

        const usecaseFactory: UsecaseFactory = serverBoot
            .getMainInjector()
            .getUsecaseFactory();
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
        const response = await RequestTest.setServer(serverBoot.getServer())
            .post(`${routePathBase}/users/authorize`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                code: `${authenticateOutput.getCode()}`,
                user_uuid: `${authenticateOutput.getUserUUID()}`,
            })
            .build();
        const {
            user_uuid,
            access_token,
            expires_in,
            token_type,
            refresh_token,
        } = response.body;
        expect(user_uuid).to.not.null;
        expect(access_token).to.not.null;
        expect(expires_in).to.not.null;
        expect(token_type).to.not.null;
        expect(refresh_token).to.not.null;
        expect(response.status).to.be.equal(200);
    });
});
