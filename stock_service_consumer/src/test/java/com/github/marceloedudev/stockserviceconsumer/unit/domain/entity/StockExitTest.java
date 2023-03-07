package com.github.marceloedudev.stockserviceconsumer.unit.domain.entity;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class StockExitTest {

    @Test
    @DisplayName("should return error with empty list of items")
    public void stockEmpty() {
        StockExit stockExit = new StockExit();
        stockExit.setUuid("197b0cb4-b1ed-4710-8b0b-5a700b334895");
        stockExit.validate();
        Assertions.assertEquals(1, stockExit.getNotifications().size());
    }

    @Test
    @DisplayName("should return error with invalid list of items")
    public void stockInvalidItem() {
        StockExit stockExit = new StockExit();
        stockExit.setUuid("197b0cb4-b1ed-4710-8b0b-5a700b334895");
        var item = stockExit.addItem(0L, 0, 300.4, "8b0b-5a700b334895-197b0cb4-b1ed-4710");
        item.validate();
        stockExit.validate();
        Assertions.assertEquals(2, item.getNotifications().size());
    }

    @Test
    @DisplayName("should not return error")
    public void stockValid() {
        StockExit stockExit = new StockExit();
        stockExit.setUuid("197b0cb4-b1ed-4710-8b0b-5a700b334895");
        stockExit.addItem(2L, 10, 300.4, "8b0b-5a700b334895-197b0cb4-b1ed-4710");
        stockExit.validate();
        Assertions.assertEquals(0, stockExit.getNotifications().size());
    }

}
