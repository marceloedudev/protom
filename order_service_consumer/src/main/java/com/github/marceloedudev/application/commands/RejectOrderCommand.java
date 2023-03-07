package com.github.marceloedudev.application.commands;

import com.github.marceloedudev.application.dto.RejectOrderInput;
import com.github.marceloedudev.domain.commands.Command;
import com.github.marceloedudev.infra.event.queue.producer.RejectOrderEventProducer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class RejectOrderCommand implements Command<RejectOrderInput> {
    private RejectOrderEventProducer rejectOrderEventProducer;

    @Inject
    public RejectOrderCommand(RejectOrderEventProducer rejectOrderEventProducer) {
        this.rejectOrderEventProducer = rejectOrderEventProducer;
    }

    @Override
    public void execute(RejectOrderInput input) {
        rejectOrderEventProducer.execute(input);
    }
}
