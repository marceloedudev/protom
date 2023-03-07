package com.github.marceloedudev.infra.sagas.ordercancelled;

import com.github.marceloedudev.domain.sagas.Saga;
import com.github.marceloedudev.domain.sagas.SagaStep;
import com.github.marceloedudev.infra.event.queue.consumer.OrderCancelledEventConsumer;
import com.github.marceloedudev.packages.sagas.choreography.SagaStepBuilder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class OrderCancelledSaga implements Saga {
    @Inject
    OrderCancelledEventConsumer orderCancelledEventConsumer;
    @Override
    public List<SagaStep> stepsDefinitions() {
        return SagaStepBuilder.with()
                .step("Order cancelled")
                    .invoke(orderCancelledEventConsumer)
                .build();
    }
}
