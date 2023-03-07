import { AppDataSource } from "./AppDataSource";
import ConfigFactory from "@/config/ConfigFactory";
import PostgresClientAdapter from "../../client/PostgresClientAdapter";
import PostgresDatabase from "@/domain/database/PostgresDatabase";
import PostgresDatabaseConnection from "@/domain/database/PostgresDatabaseConnection";

export default class PostgresMemoryAdapter implements PostgresDatabase {
    constructor(readonly config: ConfigFactory) {}

    async connect() {
        await AppDataSource.initialize();
        console.log("> Postgres connected");
        return new PostgresDatabaseConnection({
            dataSource: AppDataSource,
            client: new PostgresClientAdapter(AppDataSource),
        });
    }

    async close(): Promise<boolean> {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
        console.log("> Postgres disconnected");
        return true;
    }
}
