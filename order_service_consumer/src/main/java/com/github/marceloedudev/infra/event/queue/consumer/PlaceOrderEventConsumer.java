package com.github.marceloedudev.infra.event.queue.consumer;

import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.usecases.PlaceOrderUsecase;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageHandler;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class PlaceOrderEventConsumer extends MessageHandler<PlaceOrderInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(PlaceOrderEventConsumer.class);

    @Inject
    PlaceOrderUsecase placeOrderUsecase;

    @Override
    public Class<PlaceOrderInput> getInputClass() {
        return PlaceOrderInput.class;
    }

    @Override
    public EventQueueName getQueue() {
        return EventQueueName.PLACE_ORDER;
    }

    @Transactional
    @Override
    public void onMessage(PlaceOrderInput input) {
        log.info("> PlaceOrderEventConsumer input={}", input);
        try {
            log.info("> PlaceOrderEventConsumer input={}", input);
            placeOrderUsecase.execute(input);
        }
        catch (BadRequestException e) {
            log.error("> BadRequestException -> handleDelivery exceptions={}", e.getMessages());
            // notify...
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
