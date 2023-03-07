import DataStressTest from "./DataStressTest";
import FactoryStressTest from "./FactoryStressTest";
import autocannon from "autocannon";
import fs from "fs";
import path from "path";
import reporter from "autocannon-reporter";

export abstract class StressTestAbstract {
    public abstract registerFactories(): Array<FactoryStressTest>;

    public abstract registerDatas(): Array<DataStressTest>;

    public abstract onStart(): Promise<void>;

    public abstract onFinish(): Promise<void>;

    public abstract onURL(): string;

    async run() {
        for await (const data of this.registerDatas()) {
            await data.before();
        }
        await this.onStart();
        const instance = autocannon(
            {
                url: `${this.onURL()}`,
                connections: 4,
                duration: 30,
                // pipelining: 50,
                requests: [
                    ...this.registerFactories().map((factory) =>
                        factory.create()
                    ),
                ],
            },
            async (err, result) => {
                if (err) {
                    throw err;
                }
                this.resultsHandler(result);
                for await (const data of this.registerDatas()) {
                    await data.after();
                }
                await this.onFinish();
                console.log("> URL STRESS TEST: ", { url: this.onURL() });
                process.exit(0);
            }
        );

        process.once("SIGINT", () => {
            instance.stop();
        });

        autocannon.track(instance, { renderProgressBar: false });
    }

    private resultsHandler(result) {
        const reportOutputPath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "report.html"
        );
        const html = reporter.buildReport(result);
        const rawData = html;
        const data = Buffer.alloc(
            Buffer.byteLength(rawData, "utf8"),
            rawData,
            "utf8"
        );
        fs.writeFileSync(reportOutputPath, data);
        console.log(`> report on: ${reportOutputPath}`);
    }
}
