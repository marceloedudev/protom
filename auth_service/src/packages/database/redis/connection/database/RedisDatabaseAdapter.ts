import ConfigFactory from "@/config/ConfigFactory";
import RedisClientAdapter from "../../client/RedisClientAdapter";
import RedisDatabase from "@/domain/database/RedisDatabase";
import { createClient } from "redis";

class RedisDatabaseAdapter implements RedisDatabase {
    #client;

    constructor(readonly config: ConfigFactory) {
        this.#client = createClient({
            url: config.createConfigRedis().uri(),
        });
    }

    async connect() {
        await this.#client.connect();
        console.log("> Redis connected");
        return new RedisClientAdapter(this.#client);
    }

    async close() {
        await this.#client.disconnect();
        console.log("> Redis disconnected");
        return true;
    }
}

export default RedisDatabaseAdapter;
