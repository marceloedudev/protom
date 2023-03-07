import ConfigFactory from "@/config/ConfigFactory";
import DatabaseFactory from "@/packages/database/factory/DatabaseFactory";
import RepositoryDAOFactory from "@/infra/factory/RepositoryDAOFactory";

export default class DAORepositoryTest {
    private postgresDatabase;

    private redisDatabase;

    private mongoDatabase;

    private writerReaderFactory!: RepositoryDAOFactory;

    async onInit() {
        const configFactory = new ConfigFactory();
        const database = new DatabaseFactory(configFactory);
        this.postgresDatabase = database.createPostgres();
        this.redisDatabase = database.createRedis();
        this.mongoDatabase = database.createMongoDB();
        const postgresConnection = await this.postgresDatabase.connect();
        const redisConnection = await this.redisDatabase.connect();
        const mongodbConnection = await this.mongoDatabase.connect();
        this.writerReaderFactory = new RepositoryDAOFactory({
            postgresConnection,
            redisConnection,
            mongodbConnection,
            configFactory,
        });
    }

    async onExit() {
        await Promise.all([
            this.postgresDatabase && this.postgresDatabase.close(),
            this.redisDatabase && this.redisDatabase.close(),
            this.mongoDatabase && this.mongoDatabase.close(),
        ]);
    }

    getWriterReaderFactory() {
        return this.writerReaderFactory;
    }
}
