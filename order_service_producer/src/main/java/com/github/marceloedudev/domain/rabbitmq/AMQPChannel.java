package com.github.marceloedudev.domain.rabbitmq;

import com.github.marceloedudev.packages.queue.MessageHandler;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.util.Map;

public interface AMQPChannel {
    void setChannel(Channel channel);
    void basicPublish(String queueName, String exchangeName, String message);
    void basicPublish(String queueName, String exchangeName, String message, AMQPBasicProperties basicProperties);
    void exchangeDeclare(String exchangeName,AMPQExchangeType typeExchange, boolean durable) throws IOException;
    void queueDeclare() throws IOException;
    void basicConsume(String queueName, boolean autoAck, MessageHandler consumer) throws IOException;
    void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete) throws IOException;
    void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object>  queueArguments) throws IOException;
    void queueBind(String queue, String exchange, String routingKey) throws IOException;
}
