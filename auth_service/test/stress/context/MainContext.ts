import ConfigFactory from "@/config/ConfigFactory";
import DataStressTest from "../core/DataStressTest";
import FactoryStressTest from "../core/FactoryStressTest";
import { StressTestAbstract } from "../core/StressTest";
import UserAuthenticateFactoryStressTest from "../factories/UserAuthenticateFactoryStressTest";
import UserDataTest from "../data/UserDataTest";

export default class MainContext extends StressTestAbstract {
    public registerDatas(): DataStressTest[] {
        return [new UserDataTest()];
    }

    public onURL(): string {
        const configFactory = new ConfigFactory();
        const port = configFactory.createConfigHttp().port();
        const url = `http://localhost:${port}`;
        return url;
    }

    public async onStart(): Promise<void> {
        console.time("time stress");
    }

    public async onFinish(): Promise<void> {
        console.timeEnd("time stress");
    }

    public registerFactories(): FactoryStressTest[] {
        return [new UserAuthenticateFactoryStressTest()];
    }

    async execute() {
        await this.run();
    }
}
