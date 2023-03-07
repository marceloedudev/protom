package com.github.marceloedudev.stockserviceconsumer.e2e;

import com.github.marceloedudev.stockserviceconsumer.application.commands.OrderCancelledCommand;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledItemsInput;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockEntryDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockEntryRepository;
import com.github.marceloedudev.stockserviceconsumer.packages.event.Eventually;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class OrderCancelledTest {
    @Autowired
    OrderCancelledCommand orderCancelledCommand;

    @Autowired
    StockEntryDAO stockEntryDAO;

    @Autowired
    StockEntryRepository stockEntryRepository;

    @BeforeEach
    @Transactional
    public void setup() {
        stockEntryRepository.deleteAll();
    }

    @Test
    @DisplayName("should not be create the stock issue of the order cancelled")
    @Order(2)
    public void orderPlacedFailed() {
        var input = new OrderCancelledInput();
        input.addItem(new OrderCancelledItemsInput(2L, 0, 300.4));
        orderCancelledCommand.execute(input);
        Eventually.eventually(30, 1000, TimeUnit.MILLISECONDS, () -> {
            var stocks = stockEntryDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should be create the stock issue of the order cancelled")
    @Order(1)
    public void orderPlacedSuccess() {
        var input = new OrderCancelledInput();
        input.addItem(new OrderCancelledItemsInput(2L, 10, 300.4));
        orderCancelledCommand.execute(input);
        Eventually.eventually(30, 1000, TimeUnit.MILLISECONDS, () -> {
            var stocks = stockEntryDAO.findAll();
            var stock = stocks.get(0);
            var item = stock.getItemsStockEntry().get(0);
            Assertions.assertNotNull(stock.getUuid());
            Assertions.assertEquals(1, stock.getItemsStockEntry().size());
            Assertions.assertNotNull(item.getIdItem());
            Assertions.assertEquals(2, item.getIdItem());
            Assertions.assertEquals(10, item.getQuantity());
            Assertions.assertEquals(300.4, item.getPrice());
            Assertions.assertNotNull(item.getUuid());
        });
    }
}
