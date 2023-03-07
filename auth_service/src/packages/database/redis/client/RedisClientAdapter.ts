import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import RedisClient from "@/domain/redis/RedisClient";
import RedisClientSetOptions from "@/domain/redis/RedisClientSetOptions";

export default class RedisClientAdapter implements RedisClient {
    constructor(private readonly client) {}

    async set(
        key: string,
        value: string,
        options?: RedisClientSetOptions
    ): Promise<void> {
        try {
            await this.client.set(key, value, options);
        } catch (error) {
            throw new DatabaseException(["Redis error 'set'"], error);
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            if (!value) {
                return null;
            }
            return value;
        } catch (error) {
            throw new DatabaseException(["Redis error 'get'"], error);
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            throw new DatabaseException(["Redis error 'del'"], error);
        }
    }
}
