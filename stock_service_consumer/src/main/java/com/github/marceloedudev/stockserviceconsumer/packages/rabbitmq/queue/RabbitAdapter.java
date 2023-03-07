package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue;

import org.springframework.amqp.rabbit.connection.Connection;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

public class RabbitAdapter {
    private final RabbitTemplate rabbitTemplate;

    public RabbitAdapter(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public Connection getConnection() {
        return rabbitTemplate.getConnectionFactory().createConnection();
    }
}
