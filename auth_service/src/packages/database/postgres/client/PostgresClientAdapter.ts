import PostgresClient from "@/domain/postgres/PostgresClient";
import { Repository } from "typeorm";

export default class PostgresClientAdapter implements PostgresClient {
    private databaseConnection!: Repository<any>;

    constructor(private readonly postgresDataSource) {}

    setEntity(entity): void {
        this.databaseConnection = this.postgresDataSource.getRepository(entity);
    }

    async save<Entity>(document): Promise<Entity> {
        return this.databaseConnection.save(
            this.databaseConnection.create(document)
        );
    }

    async delete(document): Promise<void> {
        await this.databaseConnection.delete(document);
    }
}
