package com.github.marceloedudev.stockserviceconsumer.infra.sagas.ordercancelled;

import com.github.marceloedudev.stockserviceconsumer.domain.sagas.Saga;
import com.github.marceloedudev.stockserviceconsumer.domain.sagas.SagaStep;
import com.github.marceloedudev.stockserviceconsumer.infra.queue.consumer.OrderCancelledEventConsumer;
import com.github.marceloedudev.stockserviceconsumer.packages.sagas.choreography.SagaStepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderCancelledSaga implements Saga {
    @Autowired
    OrderCancelledEventConsumer orderCancelledEventConsumer;
    @Override
    public List<SagaStep> stepsDefinitions() {
        return SagaStepBuilder.with()
                .step("Order cancelled")
                .invoke(orderCancelledEventConsumer)
                .build();
    }
}
