class ConfigMongoDB {
    uri() {
        return `${process.env.MONGODB_URI}`;
    }
}

export default ConfigMongoDB;
