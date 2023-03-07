package com.github.marceloedudev.stockserviceconsumer.integration.application.usecases;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledItemsInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledOutput;
import com.github.marceloedudev.stockserviceconsumer.application.usecases.OrderCancelledUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockEntryDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockEntryRepository;
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
public class OrderCancelledUsecaseTest {
    @Autowired
    OrderCancelledUsecase orderCancelledUsecase;

    @Autowired
    StockEntryRepository stockEntryRepository;

    @Autowired
    StockEntryDAO stockEntryDAO;

    @BeforeEach
    @Transactional
    public void setup() {
        stockEntryRepository.deleteAll();
    }

    @Test
    @DisplayName("should not be create with invalid items")
    public void itemInvalid() {
        Assertions.assertThrows(BadRequestException.class, () -> {
            OrderCancelledInput input = new OrderCancelledInput();
            input.addItem(new OrderCancelledItemsInput(0L, 0, 250.2));
            orderCancelledUsecase.execute(input);
            var stocks = stockEntryDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should not be create with empty list of items")
    public void emptyItemList() {
        Assertions.assertThrows(BadRequestException.class, () -> {
            OrderCancelledInput input = new OrderCancelledInput();
            orderCancelledUsecase.execute(input);
            var stocks = stockEntryDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should be create with valid items")
    public void orderPlaced() {
        OrderCancelledInput input = new OrderCancelledInput();
        input.addItem(new OrderCancelledItemsInput(7L, 5, 250.2));
        OrderCancelledOutput output = orderCancelledUsecase.execute(input);
        Eventually.eventually(30, 150, TimeUnit.MILLISECONDS, () -> {
            Assertions.assertEquals(true, output.getSuccess());
            var stocks = stockEntryDAO.findAll();
            var stock = stocks.get(0);
            var item = stock.getItemsStockEntry().get(0);
            Assertions.assertNotNull(stock.getUuid());
            Assertions.assertEquals(1, stock.getItemsStockEntry().size());
            Assertions.assertNotNull(item.getIdItem());
            Assertions.assertEquals(7, item.getIdItem());
            Assertions.assertEquals(5, item.getQuantity());
            Assertions.assertEquals(250.2, item.getPrice());
            Assertions.assertNotNull(item.getUuid());
        });
    }
}
