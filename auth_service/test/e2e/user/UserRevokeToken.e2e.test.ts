/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../lib/faker/FakerAdapter";
import RequestTest from "../../../lib/request-test";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import UserAuthorizeOutput from "@/application/dto/UserAuthorizeOutput";
import UserRevokeTokenCommand from "@/application/commands/UserRevokeTokenCommand";
import UserRevokeTokenEventConsumer from "@/infra/event/queue/consumer/UserRevokeTokenEventConsumer";
import { expect } from "chai";
import sinon from "sinon";

describe("UserRevokeToken E2E", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const routePathBase = "/auth/v1";
    let authorizeOutput: UserAuthorizeOutput;
    const faker = new FakerAdapter();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
        await serverBoot.addConsumer();
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
        const spiedFuncConsumer = sandbox.spy(
            UserRevokeTokenEventConsumer.prototype,
            "onMessage"
        );
        const spiedFuncProducer = sandbox.spy(
            UserRevokeTokenCommand.prototype,
            "execute"
        );
        const userUUID = authorizeOutput.getUserUUID();
        const refreshToken = authorizeOutput.getRefreshToken();
        const response = await RequestTest.setServer(serverBoot.getServer())
            .delete(
                `${routePathBase}/users/${userUUID}/refresh_tokens/${refreshToken}`
            )
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .build();
        const checkEvent = await Eventually.eventually(3000, () => {
            expect(response.status).to.be.equal(202);
            expect(response.body).to.be.empty;
            expect(spiedFuncProducer.called).to.be.true;
            expect(spiedFuncConsumer.called).to.be.true;
        });
        expect(checkEvent).to.be.true;
    });
});
