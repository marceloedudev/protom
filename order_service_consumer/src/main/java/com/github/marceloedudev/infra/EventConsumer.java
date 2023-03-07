package com.github.marceloedudev.infra;

import com.github.marceloedudev.domain.sagas.Saga;
import com.github.marceloedudev.infra.sagas.ordercancelled.OrderCancelledSaga;
import com.github.marceloedudev.infra.sagas.createorder.CreateOrderSaga;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.queue.MessageEventBus;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;

@ApplicationScoped
public class EventConsumer extends MessageEventBus {

    private final LoggerAdapter log = LoggerAdapter.getLogger(EventConsumer.class);

    @Inject
    CreateOrderSaga createOrderSaga;

    @Inject
    OrderCancelledSaga orderCancelledSaga;

    @Override
    public List<Saga> registerSagas() {
        return Arrays.asList(createOrderSaga, orderCancelledSaga);
    }

    @Override
    public void onStart() {
        log.info("> EventConsumer -> onStart");
    }

}
