package com.github.marceloedudev.packages.queue;

import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.packages.databind.ObjectMapperAdapter;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.rabbitmq.factory.AMQPFactory;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.IOException;

@ApplicationScoped
public class MessageEventBus {

    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageEventBus.class);

    private final ObjectMapperAdapter objectMapper = ObjectMapperAdapter.getFactory();

    private AMQPClient amqpClient;

    private AMQPChannel channel;

    @Inject
    public MessageEventBus(AMQPFactory amqpFactory) {
      this.amqpClient = amqpFactory.createClient();
    }

    void onStart(@Observes StartupEvent ev) {
        connection();
    }

    void onStop(@Observes ShutdownEvent ev) {
    }

    private void connection() {
        try {
            channel = amqpClient.connection().getChannel();
            log.info("> Producer: Rabbitmq connected");
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
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

}
