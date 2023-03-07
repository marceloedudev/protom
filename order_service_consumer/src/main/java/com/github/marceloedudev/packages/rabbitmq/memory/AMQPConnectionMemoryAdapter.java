package com.github.marceloedudev.packages.rabbitmq.memory;

import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPConnection;

import java.io.IOException;

public class AMQPConnectionMemoryAdapter implements AMQPConnection {
    private AMQPChannel channel;

    public AMQPConnectionMemoryAdapter() {
        this.channel = new AMQPChannelMemoryAdapter();
    }

    @Override
    public AMQPChannel connect() throws IOException {
        return this.channel;
    }
}
