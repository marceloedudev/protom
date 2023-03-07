package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue;

import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPConnection;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.rabbitmq.client.Channel;

public class AMQPConnectionQueueAdapter implements AMQPConnection {
    private final LoggerAdapter log = LoggerAdapter.getLogger(AMQPConnectionQueueAdapter.class);
    private AMQPChannel channel;
    private final RabbitAdapter rabbitAdapter;

    public AMQPConnectionQueueAdapter(RabbitAdapter rabbitAdapter) {
        this.channel = new AMQPChannelQueueAdapter();
        this.rabbitAdapter = rabbitAdapter;
    }

    @Override
    public AMQPChannel connect() throws Exception {
        Channel channel = rabbitAdapter.getConnection().createChannel(false);
        this.channel.setChannel(channel);
        return this.channel;
    }

    @Override
    public void disconnect() throws Exception {
    }
}
