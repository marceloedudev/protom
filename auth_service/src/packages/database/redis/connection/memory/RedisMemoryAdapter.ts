import ConfigFactory from "@/config/ConfigFactory";
import RedisClientAdapter from "../../client/RedisClientAdapter";
import RedisDatabase from "@/domain/database/RedisDatabase";
import { RedisMemoryServer } from "redis-memory-server";
import { createClient } from "redis";

class RedisMemoryAdapter implements RedisDatabase {
    #client;

    #redisServer: RedisMemoryServer;

    constructor(readonly config: ConfigFactory) {
        this.#redisServer = new RedisMemoryServer();
    }

    async connect() {
        const host = await this.#redisServer.getHost();
        const port = await this.#redisServer.getPort();
        this.#client = createClient({
            url: `redis://${host}:${port}`,
        });
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

export default RedisMemoryAdapter;
