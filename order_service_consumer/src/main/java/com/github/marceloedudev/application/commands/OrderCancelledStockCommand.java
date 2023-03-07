package com.github.marceloedudev.application.commands;

import com.github.marceloedudev.application.dto.OrderCancelledStockInput;
import com.github.marceloedudev.domain.commands.Command;
import com.github.marceloedudev.infra.event.queue.producer.OrderCancelledStockEventProducer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class OrderCancelledStockCommand implements Command<OrderCancelledStockInput> {
    private OrderCancelledStockEventProducer orderCancelledStockEventProducer;

    @Inject
    public OrderCancelledStockCommand(OrderCancelledStockEventProducer orderCancelledStockEventProducer) {
        this.orderCancelledStockEventProducer = orderCancelledStockEventProducer;
    }

    @Override
    public void execute(OrderCancelledStockInput input) {
        orderCancelledStockEventProducer.execute(input);
    }
}
