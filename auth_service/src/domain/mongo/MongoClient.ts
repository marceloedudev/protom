export default interface MongoClient {
    setEntity(entity): void;
    create<ISchema>(document): Promise<ISchema>;
    remove(document): Promise<void>;
    findOne<ISchema>(document): Promise<ISchema | null>;
}
