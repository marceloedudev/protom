package com.github.marceloedudev.stockserviceconsumer.domain.sagas;

import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageHandler;

import java.util.Optional;

public interface SagaStep {
    void setInvocation(MessageHandler handler);
    void setCompensation(MessageHandler handler);
    String getDescription();
    Optional<MessageHandler> getInvocation();
    Optional<MessageHandler> getCompensation();
}
