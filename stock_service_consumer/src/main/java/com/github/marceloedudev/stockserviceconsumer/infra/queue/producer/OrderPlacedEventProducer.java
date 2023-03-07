package com.github.marceloedudev.stockserviceconsumer.infra.queue.producer;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.queue.EventQueue;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageEventBusProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderPlacedEventProducer implements EventQueue<OrderPlacedInput> {
    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderPlacedEventProducer.class);

    @Autowired
    MessageEventBusProducer messageEventBusProducer;

    @Override
    public void execute(OrderPlacedInput message) {
        log.info("> on producer: order placed input={}", message);
        try {
            messageEventBusProducer.publish(EventQueueName.ORDER_PLACED, message);
        } catch (Exception e) {
            log.error("> OrderPlacedEventProducer failed error={}", e.getMessage());
        }
    }
}
