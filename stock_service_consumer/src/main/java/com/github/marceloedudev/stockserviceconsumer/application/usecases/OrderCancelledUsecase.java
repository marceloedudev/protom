package com.github.marceloedudev.stockserviceconsumer.application.usecases;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderCancelledOutput;
import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockEntry;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockEntryRepository;
import com.github.marceloedudev.stockserviceconsumer.domain.usecases.Usecase;
import com.github.marceloedudev.stockserviceconsumer.packages.crypto.CryptoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@AddUsecase
public class OrderCancelledUsecase implements Usecase<OrderCancelledInput, OrderCancelledOutput> {
    @Autowired
    @Qualifier("stockEntryRepository")
    private StockEntryRepository stockEntryRepository;

    @Autowired
    private CryptoFactory cryptoFactory;

    @Override
    public OrderCancelledOutput execute(OrderCancelledInput input) {
        StockEntry stockEntry = new StockEntry();
        stockEntry.setUuid(cryptoFactory.uuidAdapter().randomUUID());
        input.getItems().stream().forEach(item -> {
            var stockItem = stockEntry.addItem(item.getIdItem(), item.getQuantity(), item.getPrice(), cryptoFactory.uuidAdapter().randomUUID());
            if (stockItem.validate()) {
                throw new BadRequestException(stockItem.getNotifications());
            }
        });
        if (stockEntry.validate()) {
            throw new BadRequestException(stockEntry.getNotifications());
        }
        stockEntryRepository.create(stockEntry);
        return new OrderCancelledOutput("Order cancelled successfully");
    }
}
