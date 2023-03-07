package com.github.marceloedudev.stockserviceconsumer.infra.sagas.orderplaced;

import com.github.marceloedudev.stockserviceconsumer.domain.sagas.Saga;
import com.github.marceloedudev.stockserviceconsumer.domain.sagas.SagaStep;
import com.github.marceloedudev.stockserviceconsumer.infra.queue.consumer.OrderPlacedEventConsumer;
import com.github.marceloedudev.stockserviceconsumer.packages.sagas.choreography.SagaStepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderPlacedSaga implements Saga {
    @Autowired
    OrderPlacedEventConsumer orderPlacedEventConsumer;
    @Override
    public List<SagaStep> stepsDefinitions() {
        return SagaStepBuilder.with()
                .step("Order placed")
                    .invoke(orderPlacedEventConsumer)
                .build();
    }
}
