import "@/packages/env";
import "reflect-metadata";

import { DataSource, DataSourceOptions } from "typeorm";

import ConfigFactory from "@/config/ConfigFactory";
import { MainSeeder } from "@/data/postgres/seeding/seeds/MainSeeder";
import { SeederOptions } from "typeorm-extension";

const config = new ConfigFactory().createConfigPostgres();

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: config.host(),
    port: Number(config.port()),
    username: config.username(),
    password: config.password(),
    database: config.database(),
    synchronize: false,
    logging: false,
    entities: ["src/models/typeorm/*.ts"],
    migrations: ["src/data/postgres/migration/**/*.ts"],
    subscribers: ["src/data/postgres/subscriber/**/*.ts"],
    // seeds
    seeds: [MainSeeder],
    factories: ["src/data/postgres/seeding/factories/**/*{.ts,.js}"],
};

export const AppDataSource = new DataSource(options);

// export = AppDataSource;
