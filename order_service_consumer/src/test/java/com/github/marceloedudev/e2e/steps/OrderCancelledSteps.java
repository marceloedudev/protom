package com.github.marceloedudev.e2e.steps;

import com.github.marceloedudev.application.commands.OrderCancelledCommand;
import com.github.marceloedudev.application.dto.OrderCancelledInput;
import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.dto.PlaceOrderInputOrderItems;
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
public class OrderCancelledSteps {

    @Inject
    PlaceOrderUsecase placeOrderUsecase;
    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;
    @Inject
    OrderDAODatabase orderDAODatabase;
    @Inject
    OrderCancelledCommand orderCancelledCommand;
    @Inject
    OrderRepositoryDatabase orderRepositoryDatabase;
    Long userId = 20L;

    @Before
    public void setup() {
        orderRepositoryDatabase.deleteAll();
    }

    @Given("^valid order with item and pending status$")
    public void valid_order_created() throws InterruptedException {
        Item item = ItemObjectMother.getRandomOrderItem();
        Item newItem = itemRepositoryDatabase.create(item);
        TimeUnit.SECONDS.sleep(5);
        Long itemId = newItem.getIdItem();
        List<PlaceOrderInputOrderItems> orderItems = Arrays.asList(
                new PlaceOrderInputOrderItems(itemId, 2)
        );
        PlaceOrderInput order = new PlaceOrderInput(userId, "139.543.310-04", orderItems);
        placeOrderUsecase.execute(order);
        TimeUnit.SECONDS.sleep(10);
    }

    @When("^produces event to cancel the order$")
    public void produces_event_cancel() throws InterruptedException {
        List<Order> orders = orderDAODatabase.findAll(userId, new Pagination(0, 20));
        Order order = orders.get(0);
        Long orderId = order.getIdOrder();
        orderCancelledCommand.execute(new OrderCancelledInput(orderId));
        TimeUnit.SECONDS.sleep(10);
    }

    @Then("^checks if the status of the order has changed to canceled$")
    public void checks_if_status_changed_canceled() {
        Eventually.eventually(300, 1000, TimeUnit.MILLISECONDS, () -> {
            List<Order> orders = orderDAODatabase.findAll(userId, new Pagination(0, 20));
            Order order = orders.get(0);
            Assertions.assertEquals(OrderStatus.CANCELED.getCode(), order.getStatus());
        });
    }
}
