package com.github.marceloedudev.application.commands;

import com.github.marceloedudev.application.dto.OrderCancelledInput;
import com.github.marceloedudev.domain.commands.Command;
import com.github.marceloedudev.infra.event.queue.producer.OrderCancelledEventProducer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class OrderCancelledCommand implements Command<OrderCancelledInput> {
    private OrderCancelledEventProducer orderCancelledEventProducer;

    @Inject
    public OrderCancelledCommand(OrderCancelledEventProducer orderCancelledEventProducer) {
        this.orderCancelledEventProducer = orderCancelledEventProducer;
    }

    @Override
    public void execute(OrderCancelledInput input) {
        orderCancelledEventProducer.execute(input);
    }
}
