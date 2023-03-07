package com.github.marceloedudev.packages.rabbitmq.memory;

import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.domain.rabbitmq.AMQPConnection;

import java.io.IOException;

public class AMQPClientMemoryAdapter implements AMQPClient {
    private AMQPChannel channel;
    private AMQPConnection amqpConnectionAdapter;

    public AMQPClientMemoryAdapter() {
        this.amqpConnectionAdapter = new AMQPConnectionMemoryAdapter();
    }

    @Override
    public AMQPClient connection() throws IOException {
        this.channel = this.amqpConnectionAdapter.connect();
        return this;
    }

    @Override
    public AMQPChannel getChannel() {
        return channel;
    }

}
