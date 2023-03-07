class ConfigMode {
    isProduction() {
        return process.env.NODE_ENV === "production";
    }

    isDevelopment() {
        return process.env.NODE_ENV === "development";
    }

    isTest() {
        return process.env.NODE_ENV === "test";
    }

    isTestInMemory() {
        return process.env.TESTS_IN_MEMORY === "true";
    }
}

export default ConfigMode;
