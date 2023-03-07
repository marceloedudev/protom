package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.memory;


import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPConnection;

public class AMQPConnectionMemoryAdapter implements AMQPConnection {
    private AMQPChannel channel;

    public AMQPConnectionMemoryAdapter() {
        this.channel = new AMQPChannelMemoryAdapter();
    }

    @Override
    public AMQPChannel connect() throws Exception {
        return this.channel;
    }

    @Override
    public void disconnect() throws Exception {

    }
}
