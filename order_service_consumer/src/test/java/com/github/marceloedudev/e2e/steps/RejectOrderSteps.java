package com.github.marceloedudev.e2e.steps;

import com.github.marceloedudev.application.commands.RejectOrderCommand;
import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.dto.PlaceOrderInputOrderItems;
import com.github.marceloedudev.application.dto.RejectOrderInput;
import com.github.marceloedudev.application.usecases.PlaceOrderUsecase;
import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.entity.OrderStatus;
import com.github.marceloedudev.domain.entity.Pagination;
import com.github.marceloedudev.infra.database.dao.OrderDAODatabase;
import com.github.marceloedudev.infra.database.repository.ItemRepositoryDatabase;
import com.github.marceloedudev.infra.database.repository.OrderRepositoryDatabase;
import com.github.marceloedudev.packages.event.Eventually;
import com.github.marceloedudev.unit.domain.entity.Item.ItemObjectMother;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Transactional
public class RejectOrderSteps {

    @Inject
    PlaceOrderUsecase placeOrderUsecase;
    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;
    @Inject
    OrderDAODatabase orderDAODatabase;
    @Inject
    RejectOrderCommand rejectOrderCommand;
    @Inject
    OrderRepositoryDatabase orderRepositoryDatabase;
    Long userId = 24L;

    @Before
    public void setup() {
        orderRepositoryDatabase.deleteAll();
    }

    @Given("^valid order with item and pending status to reject$")
    public void valid_order_created_reject() throws InterruptedException {
        Item item = ItemObjectMother.getRandomOrderItem();
        Item newItem = itemRepositoryDatabase.create(item);
        Long itemId = newItem.getIdItem();
        TimeUnit.SECONDS.sleep(5);
        List<PlaceOrderInputOrderItems> orderItems = Arrays.asList(
                new PlaceOrderInputOrderItems(itemId, 2)
        );
        PlaceOrderInput order = new PlaceOrderInput(userId, "139.543.310-04", orderItems);
        placeOrderUsecase.execute(order);
        TimeUnit.SECONDS.sleep(15);
    }

    @When("^produces event to reject the order$")
    public void produces_event_reject() throws InterruptedException {
        List<Order> orders = orderDAODatabase.findAll(userId, new Pagination(0, 20));
        Order order = orders.get(0);
        Long orderId = order.getIdOrder();
        rejectOrderCommand.execute(new RejectOrderInput(orderId));
        TimeUnit.SECONDS.sleep(10);
    }

    @Then("^checks if the status of the order has changed to rejected$")
    public void checks_if_status_changed_rejected() {
        Eventually.eventually(30, 500, TimeUnit.MILLISECONDS, () -> {
            List<Order> orders = orderDAODatabase.findAll(userId, new Pagination(0, 20));
            Order order = orders.get(0);
            Assertions.assertEquals(OrderStatus.REJECTED.getCode(), order.getStatus());
        });
    }
}
