export default interface RedisDatabase {
    connect(): Promise<any>;
    close(): Promise<boolean>;
}
