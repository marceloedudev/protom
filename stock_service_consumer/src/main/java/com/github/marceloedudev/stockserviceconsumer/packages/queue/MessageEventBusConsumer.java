package com.github.marceloedudev.stockserviceconsumer.packages.queue;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMPQExchangeType;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.domain.sagas.Saga;
import com.github.marceloedudev.stockserviceconsumer.packages.databind.ObjectMapperAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public abstract class MessageEventBusConsumer {
    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageEventBusConsumer.class);

    public abstract List<Saga> registerSagas();

    public abstract void onStart();

    @Autowired
    private AMQPClient amqpClient;

    private AMQPChannel channel;

    private List<MessageHandler> consumers;

    private final ObjectMapperAdapter objectMapper = ObjectMapperAdapter.getFactory();

    @EventListener(ContextRefreshedEvent.class)
//    @EventListener(ContextStartedEvent.class)
//    @PostConstruct
    public void onApplicationStart() {
        System.out.println(">> onApplicationStart Consumer");
        try {
//            TimeUnit.MILLISECONDS.sleep(10000);
//            Thread.sleep(2000);
            connection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @EventListener(ContextClosedEvent.class)
//    @PreDestroy
//    public void onApplicationExit() {
//        System.out.println(">> onApplicationExit Consumer");
//        try {
//            disconnection();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public void publish(EventQueueName queue, Object value) throws Exception {
//        String message = objectMapper.writeValueAsString(value);
//        channel.basicPublish(queue.getQueueName(), queue.getExchangeName(), message);
//    }
//
//    public void publish(EventQueueName queue, String message) {
//        channel.basicPublish(queue.getQueueName(), queue.getExchangeName(), message);
//    }
//
//    public void publish(String queueName, String exchangeName, String message, AMQPBasicProperties basicProperties) {
//        channel.basicPublish(queueName, exchangeName, message, basicProperties);
//    }

    private void connection() throws Exception {
        try {
            consumers = new ArrayList<>();
            channel = amqpClient.connection().getChannel();
            setupQueues(channel);
            log.info("> Consumer: Rabbitmq connected");
        }
        catch (Exception e) {
            log.info("> consumer failed error={}", e.getMessage());
//            throw new RuntimeException(e);
        }
    }

    private void disconnection() throws Exception {
        try {
            amqpClient.disconnection();
            if (channel != null) {
                channel.close();
            }
        }
        catch (Exception e) {
            log.info("> consumer disconnection error={}", e.getMessage());
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
            int prefetchCount = 1;
            channel.basicQos(prefetchCount);
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
        consumers.stream().forEach(consumer -> {
            try {
                createConsumers(consumer);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void createConsumers(MessageHandler consumer) throws Exception {
        try {
            // acknowledge the message automatically upon receipt
            boolean autoAck = true;
            channel = amqpClient.connection().getChannel();
            channel.basicConsume(consumer.getQueue().getQueueName(), autoAck, consumer);
        } catch (IOException e) {
//            channel.close();
            throw new RuntimeException(e);
        }
    }
}
