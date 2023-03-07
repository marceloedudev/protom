package com.github.marceloedudev.application.usecases;

import com.github.marceloedudev.application.commands.OrderCancelledStockCommand;
import com.github.marceloedudev.application.dto.OrderCancelledInput;
import com.github.marceloedudev.application.dto.OrderCancelledItemsStockInput;
import com.github.marceloedudev.application.dto.OrderCancelledOutput;
import com.github.marceloedudev.application.dto.OrderCancelledStockInput;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.domain.usecases.Usecase;
import com.github.marceloedudev.infra.database.dao.OrderDAODatabase;
import com.github.marceloedudev.infra.database.repository.OrderRepositoryDatabase;
import com.github.marceloedudev.infra.metrics.OrderCancelledMetrics;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class OrderCancelledUsecase implements Usecase<OrderCancelledInput, OrderCancelledOutput> {

    private OrderDAODatabase orderDAODatabase;
    private OrderRepositoryDatabase orderRepositoryDatabase;
    private OrderCancelledStockCommand orderCancelledStockCommand;
    private OrderCancelledMetrics orderCancelledMetrics;

    public OrderCancelledUsecase(OrderDAODatabase orderDAODatabase, OrderRepositoryDatabase orderRepositoryDatabase, OrderCancelledStockCommand orderCancelledStockCommand, OrderCancelledMetrics orderCancelledMetrics) {
        this.orderDAODatabase = orderDAODatabase;
        this.orderRepositoryDatabase = orderRepositoryDatabase;
        this.orderCancelledStockCommand = orderCancelledStockCommand;
        this.orderCancelledMetrics = orderCancelledMetrics;
    }

    @Override
    @Transactional
    public OrderCancelledOutput execute(OrderCancelledInput input) {
        Optional<Order> orderDB = orderDAODatabase.findById(input.getOrderId());
        if (orderDB.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        Order order = orderDB.get();
        order.cancel();
        orderRepositoryDatabase.updateStatusById(order.getIdOrder(), order.getStatus());
        OrderCancelledStockInput orderCancelledStockInput = new OrderCancelledStockInput();
        order.getOrderItems().stream().forEach(item -> {
            OrderCancelledItemsStockInput orderCancelledItemsStockInput = new OrderCancelledItemsStockInput();
            orderCancelledItemsStockInput.setIdItem(item.getIdItem());
            orderCancelledItemsStockInput.setPrice(item.getPrice());
            orderCancelledItemsStockInput.setQuantity(item.getQuantity());
            orderCancelledStockInput.addItem(orderCancelledItemsStockInput);
        });
        orderCancelledStockCommand.execute(orderCancelledStockInput);
        orderCancelledMetrics.addCountSuccess();
        return new OrderCancelledOutput("Cancel order successfully");
    }

}
