import AbstractRepositoryFactory from "@/domain/interfaces/AbstractRepositoryFactory";
import PasscodeRepositoryDatabase from "../database/PasscodeRepositoryDatabase";
import TokenRepositoryDatabase from "@/infra/repository/database/TokenRepositoryDatabase";
import UserRepositoryDatabase from "../database/UserRepositoryDatabase";

class DatabaseRepositoryFactory implements AbstractRepositoryFactory {
    #redisConnection;

    #postgresClient;

    #mongoClient;

    constructor({ postgresClient, redisConnection, mongoClient }) {
        this.#redisConnection = redisConnection;
        this.#postgresClient = postgresClient;
        this.#mongoClient = mongoClient;
    }

    createTokenRepository() {
        return new TokenRepositoryDatabase(this.#redisConnection);
    }

    createUserRepository() {
        return new UserRepositoryDatabase(
            this.#postgresClient,
            this.#mongoClient
        );
    }

    createPasscodeRepository() {
        return new PasscodeRepositoryDatabase(this.#redisConnection);
    }
}

export default DatabaseRepositoryFactory;
