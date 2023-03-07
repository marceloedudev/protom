import AbstractDAOFactory from "@/domain/interfaces/AbstractDAOFactory";
import MongoClient from "@/domain/mongo/MongoClient";
import PasscodeDAODatabase from "../database/PasscodeDAODatabase";
import RedisClient from "@/domain/redis/RedisClient";
import TokenDAODatabase from "@/infra/dao/database/TokenDAODatabase";
import UserDAODatabase from "@/infra/dao/database/UserDAODatabase";

class DatabaseDAOFactory implements AbstractDAOFactory {
    #redisConnection: RedisClient;

    #mongoClient: MongoClient;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor({ postgresClient, redisConnection, mongoClient }) {
        if (!postgresClient) {
            throw new Error("Connection postgres failed");
        }
        this.#redisConnection = redisConnection;
        this.#mongoClient = mongoClient;
    }

    createUserDAO() {
        return new UserDAODatabase(this.#mongoClient);
    }

    createTokenDAO() {
        return new TokenDAODatabase(this.#redisConnection);
    }

    createPasscodeDAO() {
        return new PasscodeDAODatabase(this.#redisConnection);
    }
}

export default DatabaseDAOFactory;
