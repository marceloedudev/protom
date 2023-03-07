/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUser from "@/domain/entity/CreateUser";
import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import Eventually from "@/packages/eventually";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import UserDAO from "@/domain/dao/UserDAO";
import UserRepository from "@/domain/repository/UserRepository";
import { expect } from "chai";
import sinon from "sinon";

describe("UserDAO", () => {
    let sandbox: sinon.SinonSandbox;

    let userDAO: UserDAO;

    let userRepository: UserRepository;

    let userAdded: CreateUser;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
        userDAO = daoRepositoryTest
            .getWriterReaderFactory()
            .createDAO()
            .createUserDAO();
        userRepository = daoRepositoryTest
            .getWriterReaderFactory()
            .createRepository()
            .createUserRepository();
    });

    after(async () => {
        await daoRepositoryTest.onExit();
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        userAdded = new CreateUser({
            username: faker.internet().userName(),
            email: faker.internet().email(),
            fullname: faker.name().fullName(),
            password: faker.internet().password(),
        });
        userAdded.setEmailVerified(faker.datatype().boolean());
        userAdded.setActive(faker.datatype().boolean());
        userAdded.setUserUUID(faker.datatype().uuid());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should return null when not finding user by email", async () => {
        const user = await userDAO.findByEmail(faker.internet().email());
        expect(user).to.be.null;
    });

    it("should return valid username when searching for email", async () => {
        await userRepository.create(userAdded);
        await Eventually.eventuallyAsync(3000, async () => {
            const user = await userDAO.findByEmail(userAdded.getEmail());
            expect(user).to.be.not.null;
            expect(user?.getEmail()).to.be.equal(userAdded.getEmail());
            expect(user?.getFullname()).to.be.equal(userAdded.getFullname());
            expect(user?.getUserId()).to.be.not.null;
            expect(user?.getUserUUID()).to.be.not.null;
            expect(user?.getUsername()).to.be.equal(userAdded.getUsername());
        });
    });

    it("should return null when not finding user by uuid", async () => {
        const user = await userDAO.findByUUID(faker.datatype().uuid());
        expect(user).to.be.null;
    });

    it("should return valid username when searching for uuid", async () => {
        await userRepository.create(userAdded);
        await Eventually.eventuallyAsync(3000, async () => {
            const user = await userDAO.findByUUID(userAdded.getUserUUID());
            expect(user).to.be.not.null;
            expect(user?.getEmail()).to.be.equal(userAdded.getEmail());
            expect(user?.getFullname()).to.be.equal(userAdded.getFullname());
            expect(user?.getUserId()).to.be.not.null;
            expect(user?.getUserUUID()).to.be.not.null;
            expect(user?.getUsername()).to.be.equal(userAdded.getUsername());
        });
    });

    it("should return null when not finding user by email or username", async () => {
        const user = await userDAO.findByEmailOrUsername(
            faker.internet().email(),
            faker.internet().userName()
        );
        expect(user).to.be.null;
    });

    it("should return valid username when searching for email or username", async () => {
        await userRepository.create(userAdded);
        await Eventually.eventuallyAsync(3000, async () => {
            const user = await userDAO.findByEmailOrUsername(
                userAdded.getEmail(),
                userAdded.getUsername()
            );
            expect(user).to.be.not.null;
            expect(user?.getEmail()).to.be.equal(userAdded.getEmail());
            expect(user?.getFullname()).to.be.equal(userAdded.getFullname());
            expect(user?.getUserId()).to.be.not.null;
            expect(user?.getUserUUID()).to.be.not.null;
            expect(user?.getUsername()).to.be.equal(userAdded.getUsername());
        });
    });
});
