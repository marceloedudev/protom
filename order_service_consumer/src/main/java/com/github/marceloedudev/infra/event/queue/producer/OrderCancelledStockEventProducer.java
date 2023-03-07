package com.github.marceloedudev.infra.event.queue.producer;

import com.github.marceloedudev.application.dto.OrderCancelledStockInput;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.queue.EventQueue;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class OrderCancelledStockEventProducer implements EventQueue<OrderCancelledStockInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderCancelledStockEventProducer.class);

    @Inject
    MessageEventBus messageEventBus;

    @Override
    public void execute(OrderCancelledStockInput message) {
        try {
            messageEventBus.publish(EventQueueName.ORDER_CANCELLED_STOCK, message);
        } catch (Exception e) {
            log.error("> OrderCancelledEventProducer failed error={}", e.getMessage());
        }
    }
}
