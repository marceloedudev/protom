package com.github.marceloedudev.stockserviceconsumer.integration.application.usecases;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedItemsInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedOutput;
import com.github.marceloedudev.stockserviceconsumer.application.usecases.OrderPlacedUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockExitDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockExitRepository;
import com.github.marceloedudev.stockserviceconsumer.packages.event.Eventually;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class OrderPlacedUsecaseTest {
    @Autowired
    OrderPlacedUsecase orderPlacedUsecase;

    @Autowired
    StockExitRepository stockExitRepository;

    @Autowired
    StockExitDAO stockExitDAO;

    @BeforeEach
    @Transactional
    public void setup() {
        stockExitRepository.deleteAll();
    }

    @Test
    @DisplayName("should not be create with invalid items")
    public void itemInvalid() {
        Assertions.assertThrows(BadRequestException.class, () -> {
            OrderPlacedInput input = new OrderPlacedInput();
            input.addItem(new OrderPlacedItemsInput(0L, 0, 250.2));
            orderPlacedUsecase.execute(input);
            var stocks = stockExitDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should not be create with empty list of items")
    public void emptyItemList() {
        Assertions.assertThrows(BadRequestException.class, () -> {
            OrderPlacedInput input = new OrderPlacedInput();
            orderPlacedUsecase.execute(input);
            var stocks = stockExitDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should be create with valid items")
    public void orderPlaced() {
        OrderPlacedInput input = new OrderPlacedInput();
        input.addItem(new OrderPlacedItemsInput(7L, 5, 250.2));
        OrderPlacedOutput output = orderPlacedUsecase.execute(input);
        Eventually.eventually(30, 150, TimeUnit.MILLISECONDS, () -> {
            Assertions.assertEquals(true, output.getSuccess());
            var stocks = stockExitDAO.findAll();
            var stock = stocks.get(0);
            var item = stock.getItemsStockExit().get(0);
            Assertions.assertNotNull(stock.getUuid());
            Assertions.assertEquals(1, stock.getItemsStockExit().size());
            Assertions.assertNotNull(item.getIdItem());
            Assertions.assertEquals(7, item.getIdItem());
            Assertions.assertEquals(5, item.getQuantity());
            Assertions.assertEquals(250.2, item.getPrice());
            Assertions.assertNotNull(item.getUuid());
        });
    }
}
