class ConfigRabbitMQ {
    getURL() {
        return `${process.env.RABBITMQ_URI}`;
    }
}

export default ConfigRabbitMQ;
