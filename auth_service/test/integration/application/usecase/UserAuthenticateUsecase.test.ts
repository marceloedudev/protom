/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import BcryptAdapter from "@/domain/bcryptjs/BcryptAdapter";
import BcryptAdapterImpl from "@/packages/bcryptjs/BcryptAdapterImpl";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import SendEmailCommand from "@/application/commands/SendEmailCommand";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import User from "@/domain/entity/User";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserDAODatabase from "@/infra/dao/database/UserDAODatabase";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthenticateUsecase", () => {
    let usecaseFactory: UsecaseFactory;
    let sandbox: sinon.SinonSandbox;
    let mainInjector;
    const faker = new FakerAdapter();
    const serverBoot = new ServerBoot();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;
    const bcriptjs: BcryptAdapter = new BcryptAdapterImpl();
    let passwordHash;

    before(async () => {
        await serverBoot.destroyAll();
        await serverBoot.connection();
        await serverBoot.configure();
        mainInjector = serverBoot.getMainInjector();
        usecaseFactory = mainInjector.getUsecaseFactory();
        passwordHash = await bcriptjs.hash(userPassword);
    });

    after(async () => {
        await serverBoot.destroyAll();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        const stub = sandbox.stub(UserDAODatabase.prototype, "findByEmail");
        stub.withArgs(userEmail).resolves(
            new User({
                user_id: faker.datatype().number(),
                username: faker.internet().userName(),
                email: userEmail,
                fullname: faker.name().fullName(),
                password_hash: passwordHash,
                user_uuid: faker.datatype().uuid(),
            })
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should throw an error email/password not found", async () => {
        const authenticate = usecaseFactory.createUserAuthenticate();
        const stub = sandbox
            .stub(authenticate, "execute")
            .throws(new BadRequestException(["Email/password not found"]));
        try {
            await authenticate.execute(
                new UserAuthenticateInput({
                    email: userEmail,
                    password: faker.internet().password(),
                    ip_address: faker.internet().ip(),
                    useragent: faker.internet().userAgent(),
                })
            );
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
        }
    });

    it("should add user authenticate", async () => {
        const autenticate = usecaseFactory.createUserAuthenticate();
        const spiedFuncEmail = sandbox.spy(
            SendEmailCommand.prototype,
            "execute"
        );
        const output = await autenticate.execute(
            new UserAuthenticateInput({
                email: userEmail,
                password: userPassword,
                ip_address: faker.internet().ip(),
                useragent: faker.internet().userAgent(),
            })
        );
        const checkEvent = await Eventually.eventuallyAsync(1000, () => {
            expect(output?.getCode()).not.null;
            expect(output?.getUserUUID()).not.null;
            expect(spiedFuncEmail.called).to.be.true;
        });
        expect(checkEvent).to.be.true;
    });
});
