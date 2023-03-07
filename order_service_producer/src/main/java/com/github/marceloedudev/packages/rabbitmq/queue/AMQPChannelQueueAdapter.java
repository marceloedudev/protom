package com.github.marceloedudev.packages.rabbitmq.queue;

import com.github.marceloedudev.domain.rabbitmq.AMPQExchangeType;
import com.github.marceloedudev.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPDeliveryModeStatus;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageHandler;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class AMQPChannelQueueAdapter implements AMQPChannel {

    private final LoggerAdapter log = LoggerAdapter.getLogger(AMQPChannelQueueAdapter.class);

    private Channel channel;

    @Override
    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    @Override
    public void basicPublish(String queueName, String exchangeName, String message) {
        AMQPBasicProperties basicProperties = new AMQPBasicProperties(
                "application/json",
                "UTF-8",
                new HashMap<>(),
                AMQPDeliveryModeStatus.NonPersistent.getCode(),
                0,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        basicPublish(queueName, exchangeName, message, basicProperties);
    }

    @Override
    public void basicPublish(String queueName, String exchangeName, String message, AMQPBasicProperties basicProperties) {
        try {
            log.info("> basicPublish queue={} message={}", queueName, message);
            byte[] buffer = message.getBytes(StandardCharsets.UTF_8);
            channel.basicPublish(exchangeName, queueName, basicProperties.getBasicProperties(), buffer);
        } catch (IOException e) {
            log.error("> basicPublish failed error={}", e.getMessage());
        }
    }

    @Override
    public void exchangeDeclare(String exchangeName, AMPQExchangeType typeExchange, boolean durable) throws IOException {
        try {
            channel.exchangeDeclare(exchangeName, typeExchange.getType(), durable);
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    @Override
    public void queueDeclare() throws IOException {
        channel.queueDeclare();
    }

    @Override
    public void basicConsume(String queueName, boolean autoAck, MessageHandler consumer) throws IOException {
        channel.basicConsume(queueName, autoAck, consumer);
    }

    @Override
    public void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete) throws IOException {
        channel.queueDeclare(queueName, durable, exclusive, autoDelete, new HashMap<>());
    }

    @Override
    public void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> queueArguments) throws IOException {
        channel.queueDeclare(queueName, durable, exclusive, autoDelete, queueArguments);
    }

    @Override
    public void queueBind(String queue, String exchange, String routingKey) throws IOException {
        channel.queueBind(queue, exchange, routingKey);
    }
}
