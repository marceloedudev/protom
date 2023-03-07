export default interface MongoDatabase {
    connect(): Promise<any>;
    close(): Promise<boolean>;
}
