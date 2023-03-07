package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.memory;


import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPConnection;

public class AMQPClientMemoryAdapter implements AMQPClient {
    private AMQPChannel channel;
    private AMQPConnection amqpConnectionAdapter;

    public AMQPClientMemoryAdapter() {
        this.amqpConnectionAdapter = new AMQPConnectionMemoryAdapter();
    }

    @Override
    public AMQPClient connection() throws Exception {
        this.channel = this.amqpConnectionAdapter.connect();
        return this;
    }

    @Override
    public void disconnection() throws Exception {
        this.amqpConnectionAdapter.disconnect();
    }

    @Override
    public AMQPChannel getChannel() {
        return channel;
    }

}
