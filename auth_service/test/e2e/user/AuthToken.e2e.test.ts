/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../lib/faker/FakerAdapter";
import RequestTest from "../../../lib/request-test";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import UserAuthorizeOutput from "@/application/dto/UserAuthorizeOutput";
import { expect } from "chai";
import sinon from "sinon";

describe("AuthToken E2E", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const routePathBase = "/auth/v1";
    let authorizeOutput: UserAuthorizeOutput;
    const faker = new FakerAdapter();

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
        const userEmail = `${faker.internet().email()}`;
        const userPassword = `${faker.internet().password()}`;
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

    afterEach(() => {
        sandbox.restore();
    });

    it("should display the information of a token that authorized", async () => {
        const response = await RequestTest.setServer(serverBoot.getServer())
            .post(`${routePathBase}/users/tokens`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                client_id: "order_service",
                client_secret: "ccab14c1-bc12-401d-97f0-63272ab9f663",
                access_token: `${authorizeOutput.getAccessToken()}`,
            })
            .build();
        const { user_id, username, email, fullname, user_uuid } = response.body;
        expect(response.status).to.be.equal(200);
        expect(user_id).to.not.null;
        expect(username).to.not.null;
        expect(email).to.not.null;
        expect(fullname).to.not.null;
        expect(user_uuid).to.not.null;
    });
});
