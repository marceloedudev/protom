package com.github.marceloedudev.stockserviceconsumer.packages.queue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.Exceptions;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.Envelope;
import com.rabbitmq.client.ShutdownSignalException;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public abstract class MessageHandler<T> implements Consumer {
    private final LoggerAdapter log = LoggerAdapter.getLogger(MessageHandler.class);

    @Autowired
    MessageErrorHandler messageErrorHandler;

    public abstract Class<T> getInputClass();

    public abstract EventQueueName getQueue();

    public abstract void onMessage(T payload);

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleConsumeOk(String s) {
        log.info("> handleConsumeOk");
    }

    @Override
    public void handleCancelOk(String s) {
        log.info("> handleCancelOk");
    }

    @Override
    public void handleCancel(String s) throws IOException {
        log.info("> handleCancel");
    }

    @Override
    public void handleShutdownSignal(String s, ShutdownSignalException e) {
        log.info("> handleShutdownSignal error={}", e.getMessage());
    }

    @Override
    public void handleRecoverOk(String s) {
        log.info("> handleRecoverOk");
    }

    @Override
    public void handleDelivery(String s, Envelope envelope, AMQP.BasicProperties basicProperties, byte[] bytes) throws IOException {
        log.info("> on handleDelivery");
        messageErrorHandler.setQueueName(getQueue());
        try {
            T body = objectMapper.readValue(bytes, getInputClass());
            log.info("> handleDelivery -> prepare -> body={}", body);
            onMessage(body);
            log.info("> handleDelivery -> success -> body={}", body);
        }
        catch (Exception e) {
            log.error("> handleDelivery -> failed exceptions={}", e.getMessage());
            messageErrorHandler.retryAttempt(envelope, basicProperties, bytes);
        }
    }
}
