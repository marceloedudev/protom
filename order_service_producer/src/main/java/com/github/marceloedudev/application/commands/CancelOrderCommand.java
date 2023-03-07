package com.github.marceloedudev.application.commands;

import com.github.marceloedudev.application.dto.CancelOrderInput;
import com.github.marceloedudev.domain.commands.Command;
import com.github.marceloedudev.infra.event.queue.producer.CancelOrderEventProducer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class CancelOrderCommand implements Command<CancelOrderInput> {

    private CancelOrderEventProducer cancelOrderEventProducer;

    @Inject
    public CancelOrderCommand(CancelOrderEventProducer cancelOrderEventProducer) {
        this.cancelOrderEventProducer = cancelOrderEventProducer;
    }

    @Override
    public void execute(CancelOrderInput input) {
        cancelOrderEventProducer.execute(input);
    }
}
