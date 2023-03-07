package com.github.marceloedudev.stockserviceconsumer.application.commands;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.domain.commands.Command;
import com.github.marceloedudev.stockserviceconsumer.infra.queue.producer.OrderCancelledEventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderCancelledCommand implements Command<OrderCancelledInput> {
    @Autowired
    private OrderCancelledEventProducer orderCancelledEventProducer;

    @Override
    public void execute(OrderCancelledInput input) {
        orderCancelledEventProducer.execute(input);
    }
}
