package com.github.marceloedudev.stockserviceconsumer.application.commands;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.domain.commands.Command;
import com.github.marceloedudev.stockserviceconsumer.infra.queue.producer.OrderPlacedEventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderPlacedCommand implements Command<OrderPlacedInput> {
    @Autowired
    private OrderPlacedEventProducer orderPlacedEventProducer;

    @Override
    public void execute(OrderPlacedInput input) {
        orderPlacedEventProducer.execute(input);
    }
}
