/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable security-node/detect-crlf */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */

import Benchmark from "benchmark";
import fg from "fast-glob";
import path from "path";

const suite = new Benchmark.Suite();

function load() {
    const currentPath = path.join(__dirname, "context");
    const entries = fg.sync(["*.ts"], { dot: true, cwd: currentPath });
    console.log("Test Benchmark:", { entries, currentPath });
    for (const file of entries) {
        const { default: model } = require(`./context/${file}`);
        model({ suite });
    }
}

load();

suite
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .on("complete", function () {
        console.log(`Fastest is ${this.filter("fastest").map("name")}`);
    })
    .run({ async: true });
