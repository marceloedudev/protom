package com.github.marceloedudev.stockserviceconsumer.packages.queue;

import com.github.marceloedudev.stockserviceconsumer.config.base.ConfigFactory;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.packages.databind.ObjectMapperAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MessageEventBusProducer {
    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageEventBusProducer.class);

    @Autowired
    private AMQPClient amqpClient;

    @Autowired
    private ConfigFactory configFactory;

    private AMQPChannel channel;

    private List<MessageHandler> consumers;

    private final ObjectMapperAdapter objectMapper = ObjectMapperAdapter.getFactory();

    @EventListener(ContextRefreshedEvent.class)
//    @EventListener(ContextStartedEvent.class)
    public void onApplicationStart() {
        System.out.println(">> onApplicationStart Producer");
        try {
            connection();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @EventListener(ContextClosedEvent.class)
//    public void onApplicationExit() {
//        System.out.println(">> onApplicationExit 1Producer");
//        try {
//            disconnection();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

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

    private void connection() throws Exception {
        try {
            consumers = new ArrayList<>();
            channel = amqpClient.connection().getChannel();
            log.info("> Producer: Rabbitmq connected");
        }
        catch (Exception e) {
            log.info("> consumer failed error={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void disconnection() throws Exception {
        try {
            amqpClient.disconnection();
        }
        catch (Exception e) {
            log.info("> Producer disconnection error={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
