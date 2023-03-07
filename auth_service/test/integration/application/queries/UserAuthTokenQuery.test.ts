/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUserInput from "@/application/dto/CreateUserInput";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import QueryFactory from "@/application/factory/QueryFactory";
import ServerBoot from "@/boot/ServerBoot";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserAuthTokenInput from "@/application/dto/UserAuthTokenInput";
import UserAuthenticateInput from "@/application/dto/UserAuthenticateInput";
import UserAuthenticateOutput from "@/application/dto/UserAuthenticateOutput";
import UserAuthorizeInput from "@/application/dto/UserAuthorizeInput";
import UserAuthorizeOutput from "@/application/dto/UserAuthorizeOutput";
import { expect } from "chai";
import sinon from "sinon";

describe("UserAuthTokenQuery", () => {
    let sandbox: sinon.SinonSandbox;
    const serverBoot = new ServerBoot();
    let authorizeOutput: UserAuthorizeOutput;
    const faker = new FakerAdapter();
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
        const userEmail = `${faker.internet().email()}`;
        const userPassword = `${faker.internet().password()}`;
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
        const output = await queryFactory.createUserAuthToken().execute(
            new UserAuthTokenInput({
                client_id: "order_service",
                client_secret: "ccab14c1-bc12-401d-97f0-63272ab9f663",
                access_token: `${authorizeOutput.getAccessToken()}`,
            })
        );
        expect(output.getUserId()).to.not.null;
        expect(output.getUsername()).to.not.null;
        expect(output.getEmail()).to.not.null;
        expect(output.getFullname()).to.not.null;
        expect(output.getUserUUID()).to.not.null;
    });
});
