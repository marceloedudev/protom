/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import RedisClientAdapter from "@/packages/database/redis/client/RedisClientAdapter";
import TokenDAO from "@/domain/dao/TokenDAO";
import TokenRepository from "@/domain/repository/TokenRepository";
import UserToken from "@/domain/entity/UserToken";
import { expect } from "chai";
import sinon from "sinon";

describe("TokenRepository", () => {
    let sandbox: sinon.SinonSandbox;

    let tokenRepository: TokenRepository;

    let tokenDAO: TokenDAO;

    let passcodeKey: string;

    let userToken: UserToken;

    let expireTime: number;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
        tokenRepository = daoRepositoryTest
            .getWriterReaderFactory()
            .createRepository()
            .createTokenRepository();
        tokenDAO = daoRepositoryTest
            .getWriterReaderFactory()
            .createDAO()
            .createTokenDAO();
    });

    after(async () => {
        await daoRepositoryTest.onExit();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        passcodeKey = faker.datatype().string();
        userToken = new UserToken({
            user_id: faker.datatype().number(),
            username: faker.internet().userName(),
            email: faker.internet().email(),
            fullname: faker.name().fullName(),
            user_uuid: faker.datatype().uuid(),
            token_created_at: new Date(),
        });
        userToken.setAccessToken(faker.datatype().uuid());
        userToken.setRefreshToken(faker.datatype().uuid());
        expireTime = faker.datatype().number();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should throw an error when creating token", async () => {
        const stub = sandbox
            .stub(RedisClientAdapter.prototype, "set")
            .throws(new Error("unexpected error"));
        try {
            await tokenRepository.create(passcodeKey, expireTime, userToken);
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should be create valid token", async () => {
        await tokenRepository.create(passcodeKey, expireTime, userToken);
        const tokenCreated = await tokenDAO.get(passcodeKey);
        expect(tokenCreated).to.be.not.null;
        expect(tokenCreated?.getUserId()).to.be.equal(userToken.getUserId());
        expect(tokenCreated?.getUsername()).to.be.equal(
            userToken.getUsername()
        );
        expect(tokenCreated?.getEmail()).to.be.equal(userToken.getEmail());
        expect(tokenCreated?.getFullname()).to.be.equal(
            userToken.getFullname()
        );
        expect(tokenCreated?.getUserUUID()).to.be.equal(
            userToken.getUserUUID()
        );
        expect(tokenCreated?.getAccessToken()).to.be.equal(
            userToken.getAccessToken()
        );
        expect(tokenCreated?.getRefreshToken()).to.be.equal(
            userToken.getRefreshToken()
        );
    });

    it("should throw error when trying to remove token", async () => {
        const stub = sandbox
            .stub(RedisClientAdapter.prototype, "del")
            .throws(new Error("unexpected error"));
        try {
            await tokenRepository.delete("1234");
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should be delete valid token", async () => {
        await tokenRepository.create(passcodeKey, expireTime, userToken);
        await tokenRepository.delete(passcodeKey);
        const tokenCreated = await tokenDAO.get(passcodeKey);
        expect(tokenCreated).to.be.null;
    });
});
