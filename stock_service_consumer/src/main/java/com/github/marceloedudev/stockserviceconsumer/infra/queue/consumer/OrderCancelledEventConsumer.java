package com.github.marceloedudev.stockserviceconsumer.infra.queue.consumer;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.application.usecases.OrderCancelledUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.EventQueueName;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class OrderCancelledEventConsumer extends MessageHandler<OrderCancelledInput> {
    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderCancelledEventConsumer.class);

    @Autowired
    OrderCancelledUsecase orderCancelledUsecase;

    @Override
    public Class<OrderCancelledInput> getInputClass() {
        return OrderCancelledInput.class;
    }

    @Override
    public EventQueueName getQueue() {
        return EventQueueName.ORDER_CANCELLED;
    }

    @Transactional
    @Override
    public void onMessage(OrderCancelledInput input) {
        log.info("> OrderCancelledEventConsumer input={}", input);
        try {
            orderCancelledUsecase.execute(input);
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
