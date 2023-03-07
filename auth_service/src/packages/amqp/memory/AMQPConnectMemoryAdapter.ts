/* eslint-disable @typescript-eslint/no-unused-vars */
import AMQPConnect from "@/domain/amqp/AMQPConnect";
import AMQPConnection from "@/domain/amqp/AMQPConnection";

export default class AMQPConnectMemoryAdapter implements AMQPConnect {
    constructor(private readonly amqpConnection: AMQPConnection) {}

    public async connect(url: string): Promise<AMQPConnection> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.amqpConnection);
            }, 3000);
        });
    }
}
