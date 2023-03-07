import AbstractDAOFactory from "@/domain/interfaces/AbstractDAOFactory";
import AbstractRepositoryFactory from "@/domain/interfaces/AbstractRepositoryFactory";
import DatabaseDAOFactory from "../dao/factory/DatabaseDAOFactory";
import DatabaseRepositoryFactory from "../repository/factory/DatabaseRepositoryFactory";
import MemoryDAOFactory from "../dao/factory/MemoryDAOFactory";
import MemoryRepositoryFactory from "../repository/factory/MemoryRepositoryFactory";

class RepositoryDAOFactory {
    #DAO: AbstractDAOFactory;

    #Repository: AbstractRepositoryFactory;

    constructor({
        postgresConnection,
        redisConnection,
        mongodbConnection,
        configFactory,
    }) {
        const repositoryFactory = new DatabaseRepositoryFactory({
            postgresClient: postgresConnection.getClient(),
            redisConnection,
            mongoClient: mongodbConnection,
        });
        const daoFactory = new DatabaseDAOFactory({
            postgresClient: postgresConnection.getClient(),
            redisConnection,
            mongoClient: mongodbConnection,
        });
        if (configFactory.createConfigMode().isTestInMemory()) {
            this.#DAO = new MemoryDAOFactory({
                dao: daoFactory,
            });
            this.#Repository = new MemoryRepositoryFactory({
                repository: repositoryFactory,
            });
            return;
        }
        this.#DAO = daoFactory;
        this.#Repository = repositoryFactory;
    }

    createDAO() {
        return this.#DAO;
    }

    createRepository() {
        return this.#Repository;
    }
}

export default RepositoryDAOFactory;
