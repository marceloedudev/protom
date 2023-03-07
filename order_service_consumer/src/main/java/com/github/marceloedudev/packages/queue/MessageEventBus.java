package com.github.marceloedudev.packages.queue;

import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.domain.sagas.Saga;
import com.github.marceloedudev.packages.databind.ObjectMapperAdapter;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.domain.rabbitmq.AMPQExchangeType;
import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.packages.rabbitmq.factory.AMQPFactory;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public abstract class MessageEventBus {

    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageEventBus.class);

    public abstract List<Saga> registerSagas();

    public abstract void onStart();

    @Inject
    AMQPFactory amqpFactory;

    private AMQPClient amqpClient;

    private AMQPChannel channel;

    private List<MessageHandler> consumers;

    private final ObjectMapperAdapter objectMapper = ObjectMapperAdapter.getFactory();

    public void onApplicationStart(@Observes StartupEvent event) {
        this.onApplicationStart();
    }

    public void onApplicationStart() {
        this.amqpClient = amqpFactory.createClient();
        connection();
    }

    public void publish(EventQueueName queue, Object value) throws Exception {
        String message = objectMapper.writeValueAsString(value);
        channel.basicPublish(queue.getQueueName(), queue.getExchangeName(), message);
    }

    public void publish(EventQueueName queue, String message) {
        channel.basicPublish(queue.getQueueName(), queue.getExchangeName(), message);
    }

    public void publish(String queueName, String exchangeName, String message, AMQPBasicProperties basicProperties) {
        channel.basicPublish(queueName, exchangeName, message, basicProperties);
    }


    private void connection() {
        try {
            consumers = new ArrayList<>();
            channel = amqpClient.connection().getChannel();
            setupQueues(channel);
            log.info("> Consumer: Rabbitmq connected");
        }
        catch (IOException e) {
            log.info("> consumer failed error={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void setupQueues(AMQPChannel channel) {
        Stream.of(EventQueueName.values()).forEach((queueName) -> {
            createExchangeAndQueue(channel, queueName);
        });
        prepareSagas();
        setupConsumers();
        onStart();
    }

    private void createExchangeAndQueue(AMQPChannel channel, EventQueueName eventQueueName) {
        try {
            String exchangeName = eventQueueName.getExchangeName();
            boolean durable = true;
            channel.exchangeDeclare(exchangeName, AMPQExchangeType.DIRECT, durable);
            createQueueBase(channel, eventQueueName);
            channel.queueDeclare();
            log.info("> createExchangeAndQueue queue={}, exchange={}", eventQueueName.getQueueName(), eventQueueName.getExchangeName());
            if (eventQueueName.isDlqEnabled()) {
                createQueueToDLQ(channel, eventQueueName);
            }
            if (eventQueueName.isRetryEnabled()) {
                createQueueToRetryAttempt(channel, eventQueueName);
            }
        }
        catch (Exception exception) {
            log.error("> createExchangeAndQueue create failed error={}", exception.getMessage());
        }
    }

    private void createQueueBase(AMQPChannel channel, EventQueueName eventQueueName) throws IOException {
        String queueName = eventQueueName.getQueueName();
        String exchangeName = eventQueueName.getExchangeName();
        createQueueAndBind(channel, queueName, exchangeName);
    }

    private void createQueueToDLQ(AMQPChannel channel, EventQueueName eventQueueName) throws IOException {
        String queueName = eventQueueName.getDlqName();
        String exchangeName = eventQueueName.getExchangeName();
        createQueueAndBind(channel, queueName, exchangeName);
    }

    private void createQueueToRetryAttempt(AMQPChannel channel, EventQueueName eventQueueName) throws IOException {
        String queueName = eventQueueName.getRetryName();
        String exchangeName = eventQueueName.getExchangeName();
        String routingKey = eventQueueName.getQueueName();
        Map<String, Object> queueArguments = new HashMap<>();
        queueArguments.put("x-dead-letter-exchange", exchangeName);
        queueArguments.put("x-dead-letter-routing-key", routingKey);
        createQueueAndBind(channel, queueName, exchangeName, queueArguments);
    }

    private void createQueueAndBind(AMQPChannel channel, String queueName, String exchangeName)  throws IOException {
        createQueueAndBind(channel, queueName, exchangeName, new HashMap<>());
    }

    private void createQueueAndBind(AMQPChannel channel, String queueName, String exchangeName,  Map<String, Object> queueArguments)  throws IOException {
        channel.queueDeclare(queueName, true, false, false, queueArguments);
        channel.queueBind(queueName, exchangeName, queueName);
    }

    private void prepareSagas() {
        registerSagas().forEach(saga -> {
            saga.stepsDefinitions().stream().forEach(consumer -> {
                log.info("> register saga={} -> DEBUG ", consumer.getDescription());

                if (!consumer.getCompensation().isEmpty()) {
                    consumers.add(consumer.getCompensation().get());
                    log.info("> register saga={} -> added compensation", consumer.getDescription());
                }
                if (!consumer.getInvocation().isEmpty()) {
                    consumers.add(consumer.getInvocation().get());
                    log.info("> register saga={} -> added invocation", consumer.getDescription());
                }
            });
        });
    }

    private void setupConsumers() {
        consumers.stream().forEach(this::createConsumers);
    }

    private void createConsumers(MessageHandler consumer) {
        try {
            // acknowledge the message automatically upon receipt
            boolean autoAck = true;
            channel = amqpClient.connection().getChannel();
            channel.basicConsume(consumer.getQueue().getQueueName(), autoAck, consumer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
