/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import { expect } from "chai";
import sinon from "sinon";

describe("CreateUserUsecase", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    const faker = new FakerAdapter();
    let usecaseFactory: UsecaseFactory;
    let user: CreateUserInput;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        await serverBoot.addServer();
        await serverBoot.addConsumer();
        const injector = serverBoot.getMainInjector();
        usecaseFactory = injector.getUsecaseFactory();
    });

    after(async () => {
        await serverBoot.destroyAll();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        user = new CreateUserInput({
            username: faker.internet().userName(),
            email: faker.internet().email(),
            fullname: faker.name().fullName(),
            password: faker.internet().password(),
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should create valid user", async () => {
        const output = await usecaseFactory.createUserUsecase().execute(user);
        const checkEvent = await Eventually.eventually(1000, () => {
            expect(output.getSuccess()).to.be.true;
        });
        expect(checkEvent).to.be.true;
    });
});
