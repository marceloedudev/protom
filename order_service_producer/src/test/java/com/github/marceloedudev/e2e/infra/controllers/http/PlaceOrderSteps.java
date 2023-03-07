package com.github.marceloedudev.e2e.infra.controllers.http;

import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.infra.database.repository.ItemRepositoryDatabase;
import com.github.marceloedudev.infra.dto.PlaceOrderRequest;
import com.github.marceloedudev.infra.dto.PlaceOrderRequestOrderItems;
import com.github.marceloedudev.unit.domain.entity.Item.ItemObjectMother;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import org.junit.jupiter.api.Assertions;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

import static io.restassured.RestAssured.given;

@Transactional
public class PlaceOrderSteps {

    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;

    Long idItemCreated;

    ValidatableResponse result;

    @Given("^item with id 20 and price 300 for valid order$")
    public void item_with_id_and_price_for_valid_order() {
        Item item = ItemObjectMother.getRandomOrderItem();
        Item itemCreated = itemRepositoryDatabase.create(item);
        idItemCreated = itemCreated.getIdItem();
    }

    @When("^create order with valid item$")
    public void create_order_with_valid_item() throws Exception {
        List<PlaceOrderRequestOrderItems> orderItems = Arrays.asList(
                new PlaceOrderRequestOrderItems(idItemCreated, 2)
        );
        PlaceOrderRequest order = new PlaceOrderRequest("139.543.310-04", orderItems);
        String token = "3ff83996-2c35-4aaa-a46e-783f169ce7a9";
        result = given()
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(order)
                .when()
                .post("/order-service/v1")
                .peek()
                .then();
    }

    @Then("^check if the order was created successfully with status 201$")
    public void check_if_the_order_was_created_successfully_with_status() throws Exception {
        result.statusCode(201);
    }

    @And("^check if the order was created successfully with the property returns success$")
    public void check_if_the_order_was_created_successfully_with_the_property_returns_success() {
        Response response = result.extract().response();
        Assertions.assertEquals(true, response.jsonPath().getBoolean("success"));
    }
}
