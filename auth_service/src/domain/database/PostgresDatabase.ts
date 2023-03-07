export default interface PostgresDatabase {
    connect(): Promise<any>;
    close(): Promise<boolean>;
}
