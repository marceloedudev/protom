package com.github.marceloedudev.stockserviceconsumer.e2e;

import com.github.marceloedudev.stockserviceconsumer.application.commands.OrderPlacedCommand;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedItemsInput;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockExitDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockExitRepository;
import com.github.marceloedudev.stockserviceconsumer.packages.event.Eventually;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class OrderPlacedTest {
    @Autowired
    OrderPlacedCommand orderPlacedCommand;

    @Autowired
    StockExitDAO stockExitDAO;

    @Autowired
    StockExitRepository stockExitRepository;

    @BeforeEach
    @Transactional
    public void setup() {
        stockExitRepository.deleteAll();
    }

    @Test
    @DisplayName("should not be create the stock issue of the order placed")
    @Order(2)
    public void orderPlacedFailed() {
        var input = new OrderPlacedInput();
        input.addItem(new OrderPlacedItemsInput(2L, 0, 300.4));
        orderPlacedCommand.execute(input);
        Eventually.eventually(30, 1000, TimeUnit.MILLISECONDS, () -> {
            var stocks = stockExitDAO.findAll();
            Assertions.assertEquals(0, stocks.size());
        });
    }

    @Test
    @DisplayName("should be create the stock issue of the order placed")
    @Order(1)
    public void orderPlacedSuccess() {
        var input = new OrderPlacedInput();
        input.addItem(new OrderPlacedItemsInput(2L, 10, 300.4));
        orderPlacedCommand.execute(input);
        Eventually.eventually(30, 1000, TimeUnit.MILLISECONDS, () -> {
            var stocks = stockExitDAO.findAll();
            var stock = stocks.get(0);
            var item = stock.getItemsStockExit().get(0);
            Assertions.assertNotNull(stock.getUuid());
            Assertions.assertEquals(1, stock.getItemsStockExit().size());
            Assertions.assertNotNull(item.getIdItem());
            Assertions.assertEquals(2, item.getIdItem());
            Assertions.assertEquals(10, item.getQuantity());
            Assertions.assertEquals(300.4, item.getPrice());
            Assertions.assertNotNull(item.getUuid());
        });
    }
}
