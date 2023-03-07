import ConfigFactory from "@/config/ConfigFactory";
import ConfigMode from "@/config/ConfigMode";
import MongoDatabaseAdapter from "../mongo/connection/database/MongoDatabaseAdapter";
import MongoMemoryAdapter from "../mongo/connection/memory/MongoMemoryAdapter";
import PostgresDatabaseAdapter from "../postgres/connection/database/PostgresDatabaseAdapter";
import PostgresMemoryAdapter from "../postgres/connection/memory/PostgresMemoryAdapter";
import RedisDatabaseAdapter from "../redis/connection/database/RedisDatabaseAdapter";
import RedisMemoryAdapter from "../redis/connection/memory/RedisMemoryAdapter";

class DatabaseFactory {
    private configMode: ConfigMode;

    constructor(private readonly configFactory: ConfigFactory) {
        this.configMode = configFactory.createConfigMode();
    }

    createPostgres() {
        if (this.configMode.isTestInMemory()) {
            return new PostgresMemoryAdapter(this.configFactory);
        }
        return new PostgresDatabaseAdapter(this.configFactory);
    }

    createRedis() {
        if (this.configMode.isTestInMemory()) {
            return new RedisMemoryAdapter(this.configFactory);
        }
        return new RedisDatabaseAdapter(this.configFactory);
    }

    createMongoDB() {
        if (this.configMode.isTestInMemory()) {
            return new MongoMemoryAdapter();
        }
        return new MongoDatabaseAdapter(this.configFactory);
    }
}

export default DatabaseFactory;
