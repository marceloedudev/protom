package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue;

import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPConnection;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;

public class AMQPClientQueueAdapter implements AMQPClient {
    private final LoggerAdapter log = LoggerAdapter.getLogger(AMQPClientQueueAdapter.class);
    private AMQPChannel channel;
    private AMQPConnection amqpConnection;

    public AMQPClientQueueAdapter(RabbitAdapter rabbitAdapter) {
        this.amqpConnection = new AMQPConnectionQueueAdapter(rabbitAdapter);
    }

    @Override
    public AMQPClient connection() throws Exception {
        try {
            this.channel = this.amqpConnection.connect();
        } catch (Exception e) {
            log.error("> connection to rabbitmq failed ", e.getMessage());
            throw new RuntimeException(e);
        }
        return this;
    }

    @Override
    public void disconnection() throws Exception {
        this.amqpConnection.disconnect();
    }

    @Override
    public AMQPChannel getChannel() {
        return channel;
    }
}
