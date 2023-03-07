class ConfigRedis {
    uri() {
        return `${process.env.REDIS_URI}`;
    }
}

export default ConfigRedis;
