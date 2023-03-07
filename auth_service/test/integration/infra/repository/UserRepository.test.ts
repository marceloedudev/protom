/* eslint-disable no-unused-expressions */
import { after, afterEach, before, beforeEach, describe, it } from "mocha";

import CreateUser from "@/domain/entity/CreateUser";
import DAORepositoryTest from "../../../utils/DAORepositoryTest";
import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import FakerAdapter from "../../../../lib/faker/FakerAdapter";
import MongoClientAdapter from "@/packages/database/mongo/client/MongoClientAdapter";
import PostgresClientAdapter from "@/packages/database/postgres/client/PostgresClientAdapter";
import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";
import { expect } from "chai";
import sinon from "sinon";

describe("UserRepository", () => {
    let sandbox: sinon.SinonSandbox;

    let userRepository: UserRepository;

    let user: CreateUser;

    const faker = new FakerAdapter();

    const daoRepositoryTest = new DAORepositoryTest();

    before(async () => {
        await daoRepositoryTest.onInit();
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
        user = new CreateUser({
            username: faker.internet().userName(),
            email: faker.internet().email(),
            fullname: faker.name().fullName(),
            password: faker.internet().password(),
        });
        user.setEmailVerified(faker.datatype().boolean());
        user.setActive(faker.datatype().boolean());
        user.setUserUUID(faker.datatype().uuid());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should throw an error in postgres when create user", async () => {
        const stub = sandbox
            .stub(PostgresClientAdapter.prototype, "save")
            .throws(new Error("unexpected error"));
        const spiedFuncMongodb = sandbox.spy(
            MongoClientAdapter.prototype,
            "remove"
        );
        try {
            await userRepository.create(user);
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(spiedFuncMongodb.called).to.be.false;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should throw an error in mongodb when create user", async () => {
        const stub = sandbox
            .stub(MongoClientAdapter.prototype, "create")
            .throws(new Error("unexpected error"));
        const spiedFuncPostgres = sandbox.spy(
            PostgresClientAdapter.prototype,
            "save"
        );
        try {
            await userRepository.create(user);
            expect.fail();
        } catch (error) {
            expect(stub.calledOnce).to.be.true;
            expect(spiedFuncPostgres.called).to.be.true;
            expect(error).to.be.an.instanceof(DatabaseException);
        }
    });

    it("should be create user in databases and return user", async () => {
        const spiedFuncPostgres = sandbox.spy(
            PostgresClientAdapter.prototype,
            "save"
        );
        const spiedFuncMongodb = sandbox.spy(
            MongoClientAdapter.prototype,
            "create"
        );
        const createdUser: User = await userRepository.create(user);
        expect(spiedFuncPostgres.called).to.be.true;
        expect(spiedFuncMongodb.called).to.be.true;
        expect(createdUser.getEmail()).to.be.equal(user.getEmail());
        expect(createdUser.getFullname()).to.be.equal(user.getFullname());
        expect(createdUser.getUserId()).to.be.not.null;
        expect(createdUser.getUserUUID()).to.be.not.null;
        expect(createdUser.getUsername()).to.be.equal(user.getUsername());
    });
});
