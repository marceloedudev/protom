package com.github.marceloedudev.infra.event.queue.producer;

import com.github.marceloedudev.application.dto.RejectOrderInput;
import com.github.marceloedudev.domain.entity.EventQueueName;
import com.github.marceloedudev.domain.queue.EventQueue;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class RejectOrderEventProducer implements EventQueue<RejectOrderInput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(RejectOrderEventProducer.class);

    @Inject
    MessageEventBus messageEventBus;

    @Override
    public void execute(RejectOrderInput message) {
        try {
            messageEventBus.publish(EventQueueName.REJECT_ORDER, message);
        } catch (Exception e) {
            log.error("> RejectOrderEventProducer failed error={}", e.getMessage());
        }
    }
}
