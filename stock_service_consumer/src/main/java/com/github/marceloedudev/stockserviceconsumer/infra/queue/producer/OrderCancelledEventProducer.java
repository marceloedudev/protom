package com.github.marceloedudev.stockserviceconsumer.infra.queue.producer;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.queue.EventQueue;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageEventBusProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderCancelledEventProducer implements EventQueue<OrderCancelledInput> {
    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderCancelledEventProducer.class);

    @Autowired
    MessageEventBusProducer messageEventBusProducer;

    @Override
    public void execute(OrderCancelledInput message) {
        log.info("> on producer: order cancelled input={}", message);
        try {
            messageEventBusProducer.publish(EventQueueName.ORDER_CANCELLED, message);
        } catch (Exception e) {
            log.error("> OrderCancelledEventProducer failed error={}", e.getMessage());
        }
    }
}
