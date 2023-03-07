package com.github.marceloedudev.packages.sagas.choreography;

import com.github.marceloedudev.domain.sagas.SagaStep;
import com.github.marceloedudev.packages.queue.MessageHandler;

import java.util.Objects;
import java.util.Optional;

public class Step implements SagaStep {

    private String description;
    private Optional<MessageHandler> invocation;
    private Optional<MessageHandler> compensation;

    public Step(String description) {
        this.description = description;
        this.invocation = Optional.empty();
        this.compensation = Optional.empty();
    }

    @Override
    public void setInvocation(MessageHandler handler) {
        invocation = Optional.of(handler);
    }

    @Override
    public void setCompensation(MessageHandler handler) {
        compensation = Optional.of(handler);
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public Optional<MessageHandler> getInvocation() {
        return invocation;
    }

    @Override
    public Optional<MessageHandler> getCompensation() {
        return compensation;
    }

    @Override
    public String toString() {
        return "Step{" +
                "description='" + description + '\'' +
                ", invocation=" + invocation +
                ", compensation=" + compensation +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Step step = (Step) o;
        return Objects.equals(description, step.description) && Objects.equals(invocation, step.invocation) && Objects.equals(compensation, step.compensation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(description, invocation, compensation);
    }
}
