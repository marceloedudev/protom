package com.github.marceloedudev.infra.event.queue.consumer;

import com.github.marceloedudev.application.dto.OrderCancelledInput;
import com.github.marceloedudev.application.usecases.OrderCancelledUsecase;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageHandler;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class OrderCancelledEventConsumer extends MessageHandler<OrderCancelledInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(OrderCancelledEventConsumer.class);

    @Inject
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
        try {
            log.info("> OrderCancelledEventConsumer input={}", input);
            orderCancelledUsecase.execute(input);
        }
        catch (NotFoundException e) {
            log.error("> NotFoundException -> handleDelivery exceptions={}", e.getMessages());
            // notify...
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
