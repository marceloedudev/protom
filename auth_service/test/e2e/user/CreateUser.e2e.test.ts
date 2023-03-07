/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserCommand from "@/application/commands/CreateUserCommand";
import CreateUserEventConsumer from "@/infra/event/queue/consumer/CreateUserEventConsumer";
import EventQueueCreateUser from "@/domain/event/EventQueueCreateUser";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../lib/faker/FakerAdapter";
import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";
import RequestTest from "../../../lib/request-test";
import ServerBoot from "@/boot/ServerBoot";
import { expect } from "chai";
import sinon from "sinon";

describe("CreateUser E2E", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const routePathBase = "/auth/v1";
    const faker = new FakerAdapter();

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
        await serverBoot.addConsumer();
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

    it("should create valid user", async () => {
        const spiedFuncConsumer = sandbox.spy(
            CreateUserEventConsumer.prototype,
            "onMessage"
        );
        const spiedFuncProducer = sandbox.spy(
            CreateUserCommand.prototype,
            "execute"
        );
        const response = await RequestTest.setServer(serverBoot.getServer())
            .post(`${routePathBase}/users`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                username: faker.internet().userName(),
                email: faker.internet().email(),
                fullname: faker.name().fullName(),
                password: faker.internet().password(),
            })
            .build();
        const checkEvent = await Eventually.eventually(2000, () => {
            expect(response.status).to.be.equal(202);
            expect(response.body).to.be.empty;
            expect(spiedFuncConsumer.called).to.be.true;
            expect(spiedFuncProducer.called).to.be.true;
        });
        expect(checkEvent).to.be.true;
    });

    it("should throw unexpected error and try to create user", async () => {
        const stub = sandbox
            .stub(CreateUserEventConsumer.prototype, "onMessage")
            .throws(new Error("unexpected error"));
        const spiedFuncHandlerError = sandbox.spy(
            MessageHandler.prototype,
            "onThrowError"
        );
        const response = await RequestTest.setServer(serverBoot.getServer())
            .post(`${routePathBase}/users`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                username: faker.internet().userName(),
                email: faker.internet().email(),
                fullname: faker.name().fullName(),
                password: faker.internet().password(),
            })
            .build();
        const checkEvent = await Eventually.eventually(
            new EventQueueCreateUser().getRetryIntervalTotal(),
            () => {
                expect(response.status).to.be.equal(202);
                expect(spiedFuncHandlerError.called).to.be.true;
                expect(stub.called).to.be.true;
                expect(stub.callCount).to.be.equal(3);
                expect(spiedFuncHandlerError.callCount).to.be.equal(3);
            }
        );
        expect(checkEvent).to.be.true;
    });
});
