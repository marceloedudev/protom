/* eslint-disable @typescript-eslint/no-unused-vars */
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";

import { DataSource } from "typeorm";
import UserSeeder from "./UserSeeder";

export class MainSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        console.log("> On Start MainSeeder");
        await runSeeder(dataSource, UserSeeder);
        console.log("> On End MainSeeder");
    }
}
