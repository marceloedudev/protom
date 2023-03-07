package com.github.marceloedudev.stockserviceconsumer.infra;

import com.github.marceloedudev.stockserviceconsumer.config.annotations.EventApplication;
import com.github.marceloedudev.stockserviceconsumer.domain.sagas.Saga;
import com.github.marceloedudev.stockserviceconsumer.infra.sagas.ordercancelled.OrderCancelledSaga;
import com.github.marceloedudev.stockserviceconsumer.infra.sagas.orderplaced.OrderPlacedSaga;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageEventBusConsumer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

@EventApplication
public class EventConsumer extends MessageEventBusConsumer {
    private final LoggerAdapter log = LoggerAdapter.getLogger(EventConsumer.class);

    @Autowired
    OrderPlacedSaga OrderPlacedSaga;

    @Autowired
    OrderCancelledSaga orderCancelledSaga;

    @Override
    public List<Saga> registerSagas() {
        return Arrays.asList(OrderPlacedSaga, orderCancelledSaga);
    }

    @Override
    public void onStart() {
        log.info(">> EventConsumer -> onStart");
    }
}
