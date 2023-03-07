package com.github.marceloedudev.infra.event.queue.consumer;

import com.github.marceloedudev.application.dto.RejectOrderInput;
import com.github.marceloedudev.application.usecases.RejectOrderUsecase;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageHandler;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class RejectOrderEventConsumer extends MessageHandler<RejectOrderInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(RejectOrderEventConsumer.class);

    @Inject
    RejectOrderUsecase rejectOrderUsecase;

    @Override
    public Class<RejectOrderInput> getInputClass() {
        return RejectOrderInput.class;
    }

    @Override
    public EventQueueName getQueue() {
        return EventQueueName.REJECT_ORDER;
    }

    @Transactional
    @Override
    public void onMessage(RejectOrderInput input) {
        try {
            log.info("> RejectOrderEventConsumer input={}", input);
            rejectOrderUsecase.execute(input);
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
