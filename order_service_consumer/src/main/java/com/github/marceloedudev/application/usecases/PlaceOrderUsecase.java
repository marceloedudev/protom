package com.github.marceloedudev.application.usecases;

import com.github.marceloedudev.application.commands.OrderPlacedCommand;
import com.github.marceloedudev.application.dto.OrderPlacedInput;
import com.github.marceloedudev.application.dto.OrderPlacedItemsInput;
import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.dto.PlaceOrderOutput;
import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.domain.usecases.Usecase;
import com.github.marceloedudev.infra.database.dao.ItemDAODatabase;
import com.github.marceloedudev.infra.database.repository.OrderRepositoryDatabase;
import com.github.marceloedudev.infra.metrics.PlaceOrderMetrics;
import com.github.marceloedudev.packages.logger.LoggerAdapter;
import com.github.marceloedudev.packages.tracing.OpenTracing;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class PlaceOrderUsecase implements Usecase<PlaceOrderInput, PlaceOrderOutput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(PlaceOrderUsecase.class);
    private ItemDAODatabase itemDAO;
    private OrderRepositoryDatabase orderRepositoryDatabase;
    private OrderPlacedCommand orderPlacedCommand;
    private PlaceOrderMetrics placeOrderMetrics;
    private OpenTracing openTracing;

    @Inject
    public PlaceOrderUsecase(ItemDAODatabase itemDAO, OrderRepositoryDatabase orderRepositoryDatabase, OrderPlacedCommand orderPlacedCommand, PlaceOrderMetrics placeOrderMetrics, OpenTracing openTracing) {
        this.itemDAO = itemDAO;
        this.orderRepositoryDatabase = orderRepositoryDatabase;
        this.orderPlacedCommand = orderPlacedCommand;
        this.placeOrderMetrics = placeOrderMetrics;
        this.openTracing = openTracing;
    }

    @Override
    @Transactional
    public PlaceOrderOutput execute(PlaceOrderInput input) {
        openTracing.startSpanFromContext("PlaceOrderUsecase", "usecase");
        Order order = new Order(input.getUserId(), input.getCpf());
        if (order.validate(input.getOrderItems().size())) {
            throw new BadRequestException(order.getNotifications());
        }
        OrderPlacedInput orderPlacedInput = new OrderPlacedInput();
        input.getOrderItems().stream().forEach(item -> {
            Optional<Item> itemFounded = itemDAO.findById(item.getIdItem());
            if (itemFounded.isEmpty()) {
                throw new NotFoundException("Item not found");
            }
            var product = itemFounded.get();
            order.addItem(product, item.getQuantity());
            orderPlacedInput.addItem(new OrderPlacedItemsInput(product.getIdItem(), item.getQuantity(), product.getPrice()));
        });
        orderRepositoryDatabase.create(order);
        openTracing.logFields("success"); // order id
        openTracing.finish();
        log.info("Success place order order={}", order);
        placeOrderMetrics.addCountSuccess();
        orderPlacedCommand.execute(orderPlacedInput);
        return new PlaceOrderOutput("Place order successfully");
    }

}
