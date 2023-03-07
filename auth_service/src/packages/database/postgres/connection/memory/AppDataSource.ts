import "@/packages/env";

import { DataSource, DataSourceOptions } from "typeorm";

import { MainSeeder } from "@/data/postgres/seeding/seeds/MainSeeder";
import { SeederOptions } from "typeorm-extension";

const options: DataSourceOptions & SeederOptions = {
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/models/typeorm/*.ts"],
    migrations: ["src/data/postgres/migration/**/*.ts"],
    subscribers: ["src/data/postgres/subscriber/**/*.ts"],
    // seeds
    seeds: [MainSeeder],
    factories: ["src/data/postgres/seeding/factories/**/*{.ts,.js}"],
};

export const AppDataSource = new DataSource(options);
