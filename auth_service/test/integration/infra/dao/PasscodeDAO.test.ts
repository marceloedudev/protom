/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import PasscodeDAO from "@/domain/dao/PasscodeDAO";
import PasscodeRepository from "@/domain/repository/PasscodeRepository";
import UserPasscode from "@/domain/entity/UserPasscode";
import { expect } from "chai";
import sinon from "sinon";

describe("PasscodeDAO", () => {
    let sandbox: sinon.SinonSandbox;

    let passcodeDAO: PasscodeDAO;

    let passcodeRepository: PasscodeRepository;

    let passcodeAdded: UserPasscode;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
        passcodeDAO = daoRepositoryTest
            .getWriterReaderFactory()
            .createDAO()
            .createPasscodeDAO();
        passcodeRepository = daoRepositoryTest
            .getWriterReaderFactory()
            .createRepository()
            .createPasscodeRepository();
    });

    after(async () => {
        await daoRepositoryTest.onExit();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        passcodeAdded = new UserPasscode({
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

    it("should return null when not found passcode", async () => {
        const passcode = await passcodeDAO.get(
            faker.datatype().number(),
            faker.datatype().string()
        );
        expect(passcode).to.be.null;
    });

    it("should return valid passcode", async () => {
        await passcodeRepository.create(passcodeAdded);
        await Eventually.eventuallyAsync(2000, async () => {
            const passcode = await passcodeDAO.get(
                passcodeAdded.getUserId(),
                passcodeAdded.getCode()
            );
            expect(passcode).to.be.not.null;
            expect(passcode?.getCode()).to.be.equal(passcodeAdded.getCode());
            expect(passcode?.getUserId()).to.be.equal(
                passcodeAdded.getUserId()
            );
        });
    });
});
