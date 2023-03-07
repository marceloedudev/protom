import AMQPChannelMemoryAdapter from "../memory/AMQPChannelMemoryAdapter";
import AMQPConnect from "@/domain/amqp/AMQPConnect";
import AMQPConnectClientAdapter from "../client/AMQPConnectClientAdapter";
import AMQPConnectMemoryAdapter from "../memory/AMQPConnectMemoryAdapter";
import AMQPConnectionMemoryAdapter from "../memory/AMQPConnectionMemoryAdapter";
import ConfigMode from "@/config/ConfigMode";

export default class AMQPFactory {
    constructor(private readonly configMode: ConfigMode) {}

    private createAMQPMemory() {
        const amqpChannelMemory = new AMQPChannelMemoryAdapter();
        const amqpConnectionMemory = new AMQPConnectionMemoryAdapter(
            amqpChannelMemory
        );
        const amqpConnect = new AMQPConnectMemoryAdapter(amqpConnectionMemory);
        return amqpConnect;
    }

    private createAMQPClient() {
        return new AMQPConnectClientAdapter();
    }

    public createAMQP(): AMQPConnect {
        if (this.configMode.isTestInMemory()) {
            return this.createAMQPMemory();
        }
        return this.createAMQPClient();
    }
}
