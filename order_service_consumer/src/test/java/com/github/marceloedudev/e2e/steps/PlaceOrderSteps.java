package com.github.marceloedudev.e2e.steps;

import com.github.marceloedudev.application.commands.PlaceOrderCommand;
import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.dto.PlaceOrderInputOrderItems;
import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.entity.OrderItem;
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
import org.junit.jupiter.api.BeforeEach;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Transactional
public class PlaceOrderSteps {

    @Inject
    PlaceOrderCommand placeOrderCommand;
    Long itemId;
    @Inject
    OrderDAODatabase orderDAODatabase;
    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;
    @Inject
    OrderRepositoryDatabase orderRepositoryDatabase;

    @Before
    public void setup() {
        orderRepositoryDatabase.deleteAll();
    }

    @Given("^consumer event and valid item for order$")
    public void consumer_event_valid_item() throws InterruptedException {
        Item item = ItemObjectMother.getRandomOrderItem();
        Item newItem = itemRepositoryDatabase.create(item);
        itemId = newItem.getIdItem();
        TimeUnit.SECONDS.sleep(5);
    }

    @When("^produces the place order event with 1 item and 2 quantity$")
    public void produces_the_place_order_event() {
        List<PlaceOrderInputOrderItems> orderItems = Arrays.asList(
                new PlaceOrderInputOrderItems(itemId, 2)
        );
        PlaceOrderInput order = new PlaceOrderInput(20L, "139.543.310-04", orderItems);
        placeOrderCommand.execute(order);
    }

    @Then("^checks if order exists and item id and quantity$")
    public void checks_if_order_exists() {
        Eventually.eventually(30, 100, TimeUnit.MILLISECONDS, () -> {
            List<Order> orders = orderDAODatabase.findAll(20L, new Pagination(0, 20));
            OrderItem orderItem = orders.get(0).getOrderItems().get(0);
            Assertions.assertEquals(1, orders.size());
            Assertions.assertEquals(2, orderItem.getQuantity());
            Assertions.assertEquals(itemId, orderItem.getIdItem());
        });
    }

}
