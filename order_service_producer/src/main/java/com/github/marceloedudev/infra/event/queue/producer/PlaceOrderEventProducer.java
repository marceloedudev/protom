package com.github.marceloedudev.infra.event.queue.producer;

import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.queue.EventQueue;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class PlaceOrderEventProducer implements EventQueue<PlaceOrderInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(PlaceOrderEventProducer.class);

    @Inject
    MessageEventBus messageEventBus;

    @Override
    public void execute(PlaceOrderInput message) {
        try {
            messageEventBus.publish(EventQueueName.PLACE_ORDER, message);
        } catch (Exception e) {
            log.error("> PlaceOrderEventProducer failed");
        }
    }
}
