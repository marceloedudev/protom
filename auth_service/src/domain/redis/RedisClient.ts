import RedisClientSetOptions from "./RedisClientSetOptions";

export default interface RedisClient {
    set(
        key: string,
        value: string,
        options?: RedisClientSetOptions
    ): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
}
