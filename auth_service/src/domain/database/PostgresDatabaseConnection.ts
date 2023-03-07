import PostgresClient from "../postgres/PostgresClient";

class PostgresDatabaseConnection {
    #dataSource: any;

    #client: PostgresClient;

    constructor({ dataSource, client }) {
        this.#dataSource = dataSource;
        this.#client = client;
    }

    getDataSource() {
        return this.#dataSource;
    }

    getClient() {
        return this.#client;
    }
}

export default PostgresDatabaseConnection;
