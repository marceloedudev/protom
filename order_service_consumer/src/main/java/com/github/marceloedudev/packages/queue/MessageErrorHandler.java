package com.github.marceloedudev.packages.queue;

import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Envelope;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class MessageErrorHandler {

    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageErrorHandler.class);

    private MessageEventBus messageEventBus;

    private EventQueueName eventQueueName;

    @Inject
    public MessageErrorHandler(MessageEventBus messageEventBus) {
        this.messageEventBus = messageEventBus;
    }

    public void setQueueName(EventQueueName eventQueueName) {
        this.eventQueueName = eventQueueName;
    }

    private void publishToDLQ(Envelope envelope, AMQPBasicProperties basicProperties, byte[] bytes) {
        try {
            messageEventBus.publish(eventQueueName.getDlqName(), eventQueueName.getExchangeName(), new String(bytes, StandardCharsets.UTF_8), basicProperties);
        } catch (Exception exception) {
            log.error("> error publishToRetry");
        }
    }

    private void publishToRetry(Envelope envelope, AMQPBasicProperties basicProperties, byte[] bytes) {
        try {
            messageEventBus.publish(eventQueueName.getRetryName(), eventQueueName.getExchangeName(), new String(bytes, StandardCharsets.UTF_8), basicProperties);
        } catch (Exception exception) {
            log.error("> error publishToRetry");
        }
    }

    public void retryAttempt(Envelope envelope, AMQP.BasicProperties basicProperties, byte[] bytes) {
        long count = getRetryAttemptCount(basicProperties);
        log.info("> retryAttempt header={}", basicProperties.getHeaders());
        AMQPBasicProperties amqpBasicProperties = new AMQPBasicProperties(
                basicProperties.getContentType(),
                basicProperties.getContentEncoding(),
                basicProperties.getHeaders(),
                basicProperties.getDeliveryMode(),
                basicProperties.getPriority(),
                basicProperties.getCorrelationId(),
                basicProperties.getReplyTo(),
                basicProperties.getExpiration(),
                basicProperties.getMessageId(),
                basicProperties.getTimestamp(),
                basicProperties.getType(),
                basicProperties.getUserId(),
                basicProperties.getAppId(),
                basicProperties.getClusterId()
        );
        if (count <= eventQueueName.getMaxRetryAttempt()) {
            long retryInterval = eventQueueName.getRetryInterval(count);
            amqpBasicProperties.setExpiration(retryInterval);
            publishToRetry(envelope, amqpBasicProperties, bytes);
            return;
        }
        basicProperties.getHeaders().remove("x-death");
        publishToDLQ(envelope, amqpBasicProperties, bytes);
    }

    private long getRetryAttemptCount(AMQP.BasicProperties basicProperties) {
        long count = 0L;
        Map<String, Object> headers = basicProperties.getHeaders();
        if (headers.containsKey("x-death")) {
            List xDeathProp = (List) Arrays.asList(headers.get("x-death")).get(0);
            int countProp = Integer.parseInt(((((Map) xDeathProp.get(0)).get("count").toString())));
            count = countProp;
        }
        count++;
        return count;
    }
}
