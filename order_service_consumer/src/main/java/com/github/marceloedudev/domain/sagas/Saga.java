package com.github.marceloedudev.domain.sagas;

import java.util.List;

public interface Saga {
    List<SagaStep> stepsDefinitions();
}
