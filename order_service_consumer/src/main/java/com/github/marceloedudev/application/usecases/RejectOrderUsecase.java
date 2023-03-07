package com.github.marceloedudev.application.usecases;

import com.github.marceloedudev.application.dto.RejectOrderInput;
import com.github.marceloedudev.application.dto.RejectOrderOutput;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.errors.exceptions.NotFoundException;
import com.github.marceloedudev.domain.usecases.Usecase;
import com.github.marceloedudev.infra.database.dao.OrderDAODatabase;
import com.github.marceloedudev.infra.database.repository.OrderRepositoryDatabase;
import com.github.marceloedudev.packages.logger.LoggerAdapter;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class RejectOrderUsecase implements Usecase<RejectOrderInput, RejectOrderOutput> {

    private final LoggerAdapter log = LoggerAdapter.getLogger(RejectOrderUsecase.class);

    private OrderDAODatabase orderDAODatabase;
    private OrderRepositoryDatabase orderRepositoryDatabase;

    public RejectOrderUsecase(OrderDAODatabase orderDAODatabase, OrderRepositoryDatabase orderRepositoryDatabase) {
        this.orderDAODatabase = orderDAODatabase;
        this.orderRepositoryDatabase = orderRepositoryDatabase;
    }

    @Override
    @Transactional
    public RejectOrderOutput execute(RejectOrderInput input) {
        Optional<Order> orderDB = orderDAODatabase.findById(input.getOrderId());
        if (orderDB.isEmpty()) {
            throw new NotFoundException("Order not found");
        }
        Order order = orderDB.get();
        order.reject();
        orderRepositoryDatabase.updateStatusById(order.getIdOrder(), order.getStatus());
        return new RejectOrderOutput("Order rejected success");
    }

}
