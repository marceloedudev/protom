package com.github.marceloedudev.stockserviceconsumer.domain.sagas;

import java.util.List;

public interface Saga {
    List<SagaStep> stepsDefinitions();
}
