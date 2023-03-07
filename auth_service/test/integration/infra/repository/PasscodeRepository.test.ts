/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import PasscodeDAO from "@/domain/dao/PasscodeDAO";
import PasscodeRepository from "@/domain/repository/PasscodeRepository";
import RedisClientAdapter from "@/packages/database/redis/client/RedisClientAdapter";
import UserPasscode from "@/domain/entity/UserPasscode";
import { expect } from "chai";
import sinon from "sinon";

describe("PasscodeRepository", () => {
    let sandbox: sinon.SinonSandbox;

    let passcodeRepository: PasscodeRepository;

    let passcodeDAO: PasscodeDAO;

    let passcode: UserPasscode;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
        passcodeRepository = daoRepositoryTest
            .getWriterReaderFactory()
            .createRepository()
            .createPasscodeRepository();
        passcodeDAO = daoRepositoryTest
            .getWriterReaderFactory()
            .createDAO()
            .createPasscodeDAO();
    });

    after(async () => {
        await daoRepositoryTest.onExit();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        passcode = new UserPasscode({
            user_uuid: faker.datatype().uuid(),
            ip_address: faker.internet().ip(),
            useragent: faker.internet().userAgent(),
            user_id: faker.datatype().number(),
            code: faker.datatype().string(),
            expire_time: faker.datatype().number(),
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should throw an error when creating passcode", async () => {
        const stub = sandbox
            .stub(RedisClientAdapter.prototype, "set")
            .throws(new Error("unexpected error"));
        try {
            await passcodeRepository.create(passcode);
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should be create valid passcode", async () => {
        await passcodeRepository.create(passcode);
        const passcodeCreated = await passcodeDAO.get(
            passcode.getUserId(),
            passcode.getCode()
        );
        expect(passcodeCreated).to.be.not.null;
        expect(passcodeCreated?.getCode()).to.be.equal(passcode.getCode());
        expect(passcodeCreated?.getUserId()).to.be.equal(passcode.getUserId());
    });

    it("should throw error when trying to remove passcode", async () => {
        const stub = sandbox
            .stub(RedisClientAdapter.prototype, "del")
            .throws(new Error("unexpected error"));
        try {
            await passcodeRepository.delete(1, "1234");
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should be delete valid passcode", async () => {
        await passcodeRepository.create(passcode);
        await passcodeRepository.delete(
            passcode.getUserId(),
            passcode.getCode()
        );
        const passcodeCreated = await passcodeDAO.get(
            passcode.getUserId(),
            passcode.getCode()
        );
        expect(passcodeCreated).to.be.null;
    });
});
