package com.github.marceloedudev.packages.rabbitmq.queue;

import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPConnection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import io.quarkiverse.rabbitmqclient.RabbitMQClient;

import java.io.IOException;

public class AMQPConnectionQueueAdapter implements AMQPConnection {

    private RabbitMQClient rabbitMQClient;
    private AMQPChannel channel;

    public AMQPConnectionQueueAdapter(RabbitMQClient rabbitMQClient) {
        this.rabbitMQClient = rabbitMQClient;
        this.channel = new AMQPChannelQueueAdapter();
    }

    public AMQPChannel connect() throws IOException {
        Connection connection = rabbitMQClient.connect();
        Channel channel = connection.createChannel();
        this.channel.setChannel(channel);
        return this.channel;
    }
}
