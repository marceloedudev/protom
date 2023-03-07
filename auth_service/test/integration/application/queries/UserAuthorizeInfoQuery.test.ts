/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import QueryFactory from "@/application/factory/QueryFactory";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInfoInput from "@/application/dto/UserAuthorizeInfoInput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthorizeInfoQuery", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    let authenticateOutput: UserAuthenticateOutput;
    const faker = new FakerAdapter();
    const userEmail = `${faker.internet().email()}`;
    const userPassword = `${faker.internet().password()}`;
    let queryFactory: QueryFactory;

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
        queryFactory = serverBoot.getMainInjector().getQueryFactory();
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

    it("should fetch authentication information", async () => {
        const output = await queryFactory.createUserAuthorizeInfo().execute(
            new UserAuthorizeInfoInput({
                code: authenticateOutput.getCode(),
                user_uuid: authenticateOutput.getUserUUID(),
            })
        );
        expect(output.getUserUUID()).to.not.null;
        expect(output.getIPAddress()).to.not.null;
        expect(output.getUseragent()).to.not.null;
        expect(output.getCode()).to.not.null;
        expect(output.getUserId()).to.not.null;
    });
});
