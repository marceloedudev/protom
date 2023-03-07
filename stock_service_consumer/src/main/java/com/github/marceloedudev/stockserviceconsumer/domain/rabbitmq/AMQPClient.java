package com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq;

public interface AMQPClient {
    AMQPClient connection() throws Exception;
    void disconnection() throws Exception;
    AMQPChannel getChannel();
}
