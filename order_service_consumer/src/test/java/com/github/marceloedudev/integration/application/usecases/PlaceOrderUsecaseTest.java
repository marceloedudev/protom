package com.github.marceloedudev.integration.application.usecases;

import com.github.marceloedudev.application.commands.OrderPlacedCommand;
import com.github.marceloedudev.application.dto.OrderPlacedInput;
import com.github.marceloedudev.application.dto.PlaceOrderInput;
import com.github.marceloedudev.application.dto.PlaceOrderInputOrderItems;
import com.github.marceloedudev.application.dto.PlaceOrderOutput;
import com.github.marceloedudev.application.usecases.PlaceOrderUsecase;
import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.infra.database.repository.ItemRepositoryDatabase;
import com.github.marceloedudev.unit.domain.entity.Item.ItemObjectMother;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@QuarkusTest
@Transactional
public class PlaceOrderUsecaseTest {

    @Inject
    PlaceOrderUsecase placeOrderUsecase;

    @Inject
    ItemRepositoryDatabase itemRepositoryDatabase;

    @InjectMock
    OrderPlacedCommand orderPlacedCommand;

    Long itemId;

    @BeforeEach
    public void setup() throws InterruptedException {
        Item item = ItemObjectMother.getRandomOrderItem();
        Item newItem = itemRepositoryDatabase.create(item);
        itemId = newItem.getIdItem();
        TimeUnit.SECONDS.sleep(5);
    }

    @Transactional
    @Test
    public void createOrder() {
        List<PlaceOrderInputOrderItems> orderItems = Arrays.asList(
                new PlaceOrderInputOrderItems(itemId, 2)
        );
        PlaceOrderInput order = new PlaceOrderInput(20L, "139.543.310-04", orderItems);
        PlaceOrderOutput output = placeOrderUsecase.execute(order);
        Mockito.verify(orderPlacedCommand, Mockito.times(1)).execute(Mockito.any(OrderPlacedInput.class));
        Assertions.assertEquals(true, output.getSuccess());
    }
}
