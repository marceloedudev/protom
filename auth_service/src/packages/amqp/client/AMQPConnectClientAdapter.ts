import AMQPConnect from "@/domain/amqp/AMQPConnect";
import AMQPConnection from "@/domain/amqp/AMQPConnection";
import AMQPConnectionClientAdapter from "./AMQPConnectionClientAdapter";
import amqp from "amqplib";

export default class AMQPConnectClientAdapter implements AMQPConnect {
    public async connect(url: string): Promise<AMQPConnection> {
        const connection = await amqp.connect(url);
        return new AMQPConnectionClientAdapter(connection);
    }
}
