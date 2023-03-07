import MongoClientAdapter from "../../client/MongoClientAdapter";
import MongoDatabase from "@/domain/database/MongoDatabase";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default class MongoMemoryAdapter implements MongoDatabase {
    #mongoServer;

    async connect(): Promise<any> {
        this.#mongoServer = await MongoMemoryServer.create();
        const connection = await mongoose.connect(this.#mongoServer.getUri());
        console.log("> Mongodb connected");
        return new MongoClientAdapter(connection);
    }

    async close(): Promise<boolean> {
        if (this.#mongoServer) {
            console.log("> Mongodb disconnected");
            await mongoose.connection.dropDatabase();
            await Promise.all([
                mongoose.connection.close(),
                mongoose.disconnect(),
                this.#mongoServer.stop(),
            ]);
        }
        return true;
    }
}
