import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { DataSource } from "typeorm";
import { UserModelPostgres } from "@/models/typeorm/UserModelPostgres";

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        console.log("On UserSeeder");

        // const repository =  dataSource.getRepository(UserModelPostgres);
        // await repository.insert([
        //     {
        //         firstName: 'Lorem',
        //         lastName: 'Ipsum',
        //     }
        // ]);

        // ---------------------------------------------------

        const userFactory = await factoryManager.get(UserModelPostgres);
        // save 1 factory generated entity, to the database
        await userFactory.save();

        // save 5 factory generated entities, to the database
        await userFactory.saveMany(10);
    }
}
