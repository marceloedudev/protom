package com.github.marceloedudev.infra.event.queue.producer;

import com.github.marceloedudev.application.dto.OrderPlacedInput;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.queue.EventQueue;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class OrderPlacedEventProducer implements EventQueue<OrderPlacedInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderPlacedEventProducer.class);

    @Inject
    MessageEventBus messageEventBus;

    @Override
    public void execute(OrderPlacedInput message) {
        log.info("> on producer: order placed input={}", message);
        try {
            messageEventBus.publish(EventQueueName.ORDER_PLACED, message);
        } catch (Exception e) {
            log.error("> OrderPlacedEventProducer failed error={}", e.getMessage());
        }
    }
}
