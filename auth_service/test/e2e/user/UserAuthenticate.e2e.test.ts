/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../lib/faker/FakerAdapter";
import RequestTest from "../../../lib/request-test";
import SendEmailCommand from "@/application/commands/SendEmailCommand";
import ServerBoot from "@/boot/ServerBoot";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthenticate E2E", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const routePathBase = "/auth/v1";
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
        const usecaseFactory = serverBoot.getMainInjector().getUsecaseFactory();
        await usecaseFactory.createUserUsecase().execute(
            new CreateUserInput({
                username: faker.internet().userName(),
                email: userEmail,
                fullname: faker.name().fullName(),
                password: userPassword,
            })
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should request authorization to access the account", async () => {
        const spiedFuncEmail = sandbox.spy(
            SendEmailCommand.prototype,
            "execute"
        );
        const response = await RequestTest.setServer(serverBoot.getServer())
            .post(`${routePathBase}/users/authenticate`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                email: userEmail,
                password: userPassword,
            })
            .build();
        expect(response.status).to.be.equal(200);
        expect(spiedFuncEmail.called).to.be.true;
        expect(response.body.user_uuid).to.be.not.null;
    });
});
