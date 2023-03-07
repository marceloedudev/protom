package com.github.marceloedudev.stockserviceconsumer.infra.queue.consumer;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.application.usecases.OrderPlacedUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class OrderPlacedEventConsumer extends MessageHandler<OrderPlacedInput> {
    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderPlacedEventConsumer.class);

    @Autowired
    OrderPlacedUsecase orderPlacedUsecase;

    @Override
    public Class<OrderPlacedInput> getInputClass() {
        return OrderPlacedInput.class;
    }

    @Override
    public EventQueueName getQueue() {
        return EventQueueName.ORDER_PLACED;
    }

    @Override
    @Transactional
    public void onMessage(OrderPlacedInput input) {
        log.info("> OrderPlacedEventConsumer input={}", input);
        try {
            orderPlacedUsecase.execute(input);
        }
        catch (BadRequestException e) {
            log.error("> BadRequestException -> handleDelivery exceptions={}", e.getMessages());
        }
        catch (NotFoundException e) {
            log.error("> NotFoundException -> handleDelivery exceptions={}", e.getMessages());
        }
        catch (Exception e) {
            log.error("> Exception -> handleDelivery exceptions={}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
