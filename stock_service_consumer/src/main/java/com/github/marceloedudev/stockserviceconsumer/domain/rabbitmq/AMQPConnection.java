package com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq;

public interface AMQPConnection {
    AMQPChannel connect() throws Exception;
    void disconnect() throws Exception;
}
