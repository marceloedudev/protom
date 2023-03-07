package com.github.marceloedudev.stockserviceconsumer.application.usecases;

import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedInput;
import com.github.marceloedudev.stockserviceconsumer.application.dto.OrderPlacedOutput;
import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddUsecase;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;
import com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions.BadRequestException;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockExitRepository;
import com.github.marceloedudev.stockserviceconsumer.domain.usecases.Usecase;
import com.github.marceloedudev.stockserviceconsumer.packages.crypto.CryptoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Transactional;

@AddUsecase
public class OrderPlacedUsecase implements Usecase<OrderPlacedInput, OrderPlacedOutput> {
    @Autowired
    @Qualifier("stockExitRepository")
    private StockExitRepository stockExitRepository;

    @Autowired
    private CryptoFactory cryptoFactory;

    @Override
    @Transactional
    public OrderPlacedOutput execute(OrderPlacedInput input) {
        StockExit stockExit = new StockExit();
        stockExit.setUuid(cryptoFactory.uuidAdapter().randomUUID());
        input.getItems().stream().forEach(item -> {
            var stockItem = stockExit.addItem(item.getIdItem(), item.getQuantity(), item.getPrice(), cryptoFactory.uuidAdapter().randomUUID());
            if (stockItem.validate()) {
                throw new BadRequestException(stockItem.getNotifications());
            }
        });
        if (stockExit.validate()) {
            throw new BadRequestException(stockExit.getNotifications());
        }
        stockExitRepository.create(stockExit);
        return new OrderPlacedOutput("Order placed successfully");
    }
}
