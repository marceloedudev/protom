package com.github.marceloedudev.packages.sagas.choreography;

import com.github.marceloedudev.domain.sagas.SagaStep;
import com.github.marceloedudev.packages.queue.MessageHandler;

import java.util.ArrayList;
import java.util.List;

public class SagaStepBuilder {

    private Step currentStep;
    private List<StepMap> steps;
    private String description;

    public SagaStepBuilder() {
        this.steps = new ArrayList<>();
    }

    public static SagaStepBuilder with() {
        return new SagaStepBuilder();
    }

    public SagaStepBuilder step(String description) {
        currentStep = new Step(description);
        this.description = description;
        return this;
    }

    public SagaStepBuilder invoke(MessageHandler handler) {
        currentStep.setInvocation(handler);
        steps.add(new StepMap(description, handler, null));
        return this;
    }

    public SagaStepBuilder withCompensation(MessageHandler handler) {
        currentStep.setCompensation(handler);
        steps.add(new StepMap(description, null, handler));
        return this;
    }

    public List<SagaStep> build() {
        List<SagaStep> stepList = new ArrayList<>();
        for (StepMap sagaMap : steps) {
            Step step = new Step(sagaMap.getDescription());
            if (sagaMap.getInvoke() != null) {
                step.setInvocation(sagaMap.getInvoke());
            }
            if (sagaMap.getCompensation() != null) {
                step.setCompensation(sagaMap.getCompensation());
            }
            stepList.add(step);
        }
        return stepList;
    }

}
