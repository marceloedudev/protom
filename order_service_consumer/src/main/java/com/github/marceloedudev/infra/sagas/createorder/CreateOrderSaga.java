package com.github.marceloedudev.infra.sagas.createorder;

import com.github.marceloedudev.domain.sagas.Saga;
import com.github.marceloedudev.domain.sagas.SagaStep;
import com.github.marceloedudev.infra.event.queue.consumer.PlaceOrderEventConsumer;
import com.github.marceloedudev.infra.event.queue.consumer.RejectOrderEventConsumer;
import com.github.marceloedudev.packages.sagas.choreography.SagaStepBuilder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class CreateOrderSaga implements Saga {
    @Inject
    PlaceOrderEventConsumer placeOrderEventConsumer;
    @Inject
    RejectOrderEventConsumer rejectOrderEventConsumer;
    @Override
    public List<SagaStep> stepsDefinitions() {
        return SagaStepBuilder.with()
                .step("Create order")
                    .invoke(placeOrderEventConsumer)
                    .withCompensation(rejectOrderEventConsumer)
                .step("Reserve credit")
                .step("Approve order")
                .build();
    }
}
