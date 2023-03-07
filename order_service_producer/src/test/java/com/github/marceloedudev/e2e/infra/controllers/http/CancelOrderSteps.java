package com.github.marceloedudev.e2e.infra.controllers.http;

import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.infra.database.repository.ItemRepositoryDatabase;
import com.github.marceloedudev.infra.database.repository.OrderRepositoryDatabase;
import com.github.marceloedudev.unit.domain.entity.Item.ItemObjectMother;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.http.ContentType;
import io.restassured.response.ValidatableResponse;

import javax.inject.Inject;
import javax.transaction.Transactional;

import static io.restassured.RestAssured.given;

@Transactional
public class CancelOrderSteps {

    @Inject
    OrderRepositoryDatabase orderRepositoryDatabase;

    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;

    ValidatableResponse result;

    Item item;

    @Before()
    public void setup() {
        item = ItemObjectMother.getRandomOrderItem();
        itemRepositoryDatabase.create(item);
    }

    @Given("^valid order to cancel with valid item$")
    public void valid_order_to_cancel_with_valid_item() {
        String cpf = "139.543.310-04";
        Order order = new Order();
        order.setUserId(20L);
        order.setCpf(cpf);
        order.addItem(item, 2);
        orderRepositoryDatabase.create(order);
    }

    @When("^cancel valid order$")
    public void cancel_valid_order() {
        String token = "3ff83996-2c35-4aaa-a46e-783f169ce7a9";
        Long orderId = 1L;
        result = given()
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .when()
                .patch("/order-service/v1/" + orderId)
                .peek()
                .then();
    }

    @Then("^check the status of the canceled order$")
    public void check_the_status_of_the_canceled_order() throws Exception {
        result.statusCode(200);
    }

}
