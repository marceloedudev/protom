package com.github.marceloedudev.infra.event.queue.producer;

import com.github.marceloedudev.application.dto.CancelOrderInput;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.queue.EventQueue;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class CancelOrderEventProducer implements EventQueue<CancelOrderInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(CancelOrderEventProducer.class);

    @Inject
    MessageEventBus messageEventBus;

    @Override
    public void execute(CancelOrderInput message) {
        try {
            messageEventBus.publish(EventQueueName.CANCEL_ORDER, message);
        } catch (Exception e) {
            log.error("> CancelOrderEventProducer failed");
        }
    }
}
