import ConfigFactory from "@/config/ConfigFactory";
import DatabaseFactory from "@/packages/database/factory/DatabaseFactory";
import UserSeederMongoDB from "./UserSeederMongoDB";

class MainSeederMongoDB {
    #mongoDatabase;

    constructor() {
        const configFactory = new ConfigFactory();
        const database = new DatabaseFactory(configFactory);
        this.#mongoDatabase = database.createMongoDB();
    }

    async run() {
        try {
            await this.#mongoDatabase.connect();
            await new UserSeederMongoDB().run();
            console.log(">> Seeder to mongodb success");
        } catch (error) {
            console.log(">> error seed mongodb ", { error });
        }
    }
}

new MainSeederMongoDB().run();
