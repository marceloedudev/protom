import * as mongoose from "mongoose";

import ConfigFactory from "@/config/ConfigFactory";
import MongoClientAdapter from "../../client/MongoClientAdapter";
import MongoDatabase from "@/domain/database/MongoDatabase";

export default class MongoDatabaseAdapter implements MongoDatabase {
    #connection;

    constructor(readonly config: ConfigFactory) {}

    async connect() {
        const config = {
            uri: this.config.createConfigMongoDB().uri(),
        };
        this.#connection = await mongoose.connect(config.uri);
        console.log("> Mongodb connected");
        return new MongoClientAdapter(this.#connection);
    }

    async close() {
        if (this.#connection) {
            this.#connection.disconnect();
        }
        console.log("> Mongodb disconnected");
        return true;
    }
}
