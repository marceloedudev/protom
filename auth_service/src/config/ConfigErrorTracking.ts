class ConfigErrorTracking {
    getAccessToken() {
        return `${process.env.ROLLBAR_ACCESS_TOKEN}`;
    }
}

export default ConfigErrorTracking;
