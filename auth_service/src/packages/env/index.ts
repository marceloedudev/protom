/* eslint-disable no-case-declarations */
import { config as configDotenv } from "dotenv";
import path from "path";

switch (process.env.NODE_ENV) {
    case "development": {
        console.log("Environment is 'development'");
        const currentPath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "env",
            "/.env.development"
        );
        configDotenv({
            path: currentPath,
        });
        break;
    }
    case "production": {
        console.log("Environment is 'production'");
        configDotenv({
            path: path.join(
                __dirname,
                "..",
                "..",
                "..",
                "env",
                "/.env.production"
            ),
        });
        break;
    }
    case "test": {
        console.log("Environment is 'test'");
        configDotenv({
            path: path.join(__dirname, "..", "..", "..", "env", "/.env.test"),
        });
        break;
    }
    default: {
        throw new Error(`'NODE_ENV' is not handled!`);
    }
}
