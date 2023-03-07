/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import TokenDAO from "@/domain/dao/TokenDAO";
import TokenRepository from "@/domain/repository/TokenRepository";
import UserToken from "@/domain/entity/UserToken";
import { expect } from "chai";
import sinon from "sinon";

describe("TokenDAO", () => {
    let sandbox: sinon.SinonSandbox;

    let tokenDAO: TokenDAO;

    let tokenRepository: TokenRepository;

    let passcodeKey: string;

    let userToken: UserToken;

    let expireTime: number;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
        tokenDAO = daoRepositoryTest
            .getWriterReaderFactory()
            .createDAO()
            .createTokenDAO();
        tokenRepository = daoRepositoryTest
            .getWriterReaderFactory()
            .createRepository()
            .createTokenRepository();
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

    it("should return null when not found token", async () => {
        const token = await tokenDAO.get(faker.datatype().string());
        expect(token).to.be.null;
    });

    it("should return valid token", async () => {
        await tokenRepository.create(passcodeKey, expireTime, userToken);
        await Eventually.eventuallyAsync(2000, async () => {
            const token = await tokenDAO.get(passcodeKey);
            expect(token).to.be.not.null;
            expect(token?.getUserId()).to.be.equal(userToken.getUserId());
            expect(token?.getUsername()).to.be.equal(userToken.getUsername());
            expect(token?.getEmail()).to.be.equal(userToken.getEmail());
            expect(token?.getFullname()).to.be.equal(userToken.getFullname());
            expect(token?.getUserUUID()).to.be.equal(userToken.getUserUUID());
            expect(token?.getAccessToken()).to.be.equal(
                userToken.getAccessToken()
            );
            expect(token?.getRefreshToken()).to.be.equal(
                userToken.getRefreshToken()
            );
        });
    });
});
