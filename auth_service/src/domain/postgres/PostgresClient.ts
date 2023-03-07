export default interface PostgresClient {
    setEntity(entity): void;
    save<Entity>(document): Promise<Entity>;
    delete(document): Promise<void>;
}
