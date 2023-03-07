package com.github.marceloedudev.integration.application.usecases;

import com.github.marceloedudev.application.dto.OrderCancelledInput;
import com.github.marceloedudev.application.dto.OrderCancelledOutput;
import com.github.marceloedudev.application.usecases.OrderCancelledUsecase;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.infra.database.dao.OrderDAODatabase;
import com.github.marceloedudev.unit.domain.entity.Order.OrderObjectMother;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Optional;

@QuarkusTest
public class OrderCancelledUsecaseTest {

    @Inject
    OrderCancelledUsecase orderCancelledUsecase;

    @InjectMock
    OrderDAODatabase orderDAODatabase;

    Long orderId = 8L;

    @BeforeEach
    public void setup() {
        Order order = OrderObjectMother.validAndWithoutItem();
        Mockito.when(orderDAODatabase.findById(orderId)).thenReturn(Optional.of(order));
    }

    @Transactional
    @Test
    public void orderCancelled() {
        OrderCancelledOutput output = orderCancelledUsecase.execute(new OrderCancelledInput(orderId));
        Assertions.assertEquals(true, output.getSuccess());
    }
}
