package com.github.marceloedudev.application.commands;

import com.github.marceloedudev.application.dto.OrderPlacedInput;
import com.github.marceloedudev.domain.commands.Command;
import com.github.marceloedudev.infra.event.queue.producer.OrderPlacedEventProducer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class OrderPlacedCommand implements Command<OrderPlacedInput> {
    private OrderPlacedEventProducer orderPlacedEventProducer;

    @Inject
    public OrderPlacedCommand(OrderPlacedEventProducer orderPlacedEventProducer) {
        this.orderPlacedEventProducer = orderPlacedEventProducer;
    }

    @Override
    public void execute(OrderPlacedInput input) {
        orderPlacedEventProducer.execute(input);
    }
}
