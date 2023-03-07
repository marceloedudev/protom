package com.github.marceloedudev.packages.rabbitmq.queue;

import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.domain.rabbitmq.AMQPConnection;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import io.quarkiverse.rabbitmqclient.RabbitMQClient;

import java.io.IOException;

public class AMQPClientQueueAdapter implements AMQPClient {
    private final LoggerAdapter log = LoggerAdapter.getLogger(AMQPClientQueueAdapter.class);
    private AMQPChannel channel;
    private AMQPConnection amqpConnection;


    public AMQPClientQueueAdapter(RabbitMQClient rabbitMQClient) {
        this.amqpConnection = new AMQPConnectionQueueAdapter(rabbitMQClient);
    }

    @Override
    public AMQPClient connection() throws IOException {
        try {
            this.channel = this.amqpConnection.connect();
        } catch (IOException e) {
            log.error("> connection to rabbitmq failed ", e.getMessage());
            throw new RuntimeException(e);
        }
        return this;
    }

    @Override
    public AMQPChannel getChannel() {
        return channel;
    }

}
