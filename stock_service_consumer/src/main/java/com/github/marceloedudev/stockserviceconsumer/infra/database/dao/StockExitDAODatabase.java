package com.github.marceloedudev.stockserviceconsumer.infra.database.dao;

import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockExitDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.StockExitJPA;

import java.util.List;
import java.util.stream.Collectors;

@AddDAO
public class StockExitDAODatabase implements StockExitDAO {
    private StockExitJPA stockExitJPA;

    public StockExitDAODatabase(StockExitJPA stockExitJPA) {
        this.stockExitJPA = stockExitJPA;
    }

    @Override
    public List<StockExit> findAll() {
        return stockExitJPA.findAll().stream().map(stock -> {
            StockExit stockExit = new StockExit();
            stockExit.setIdStockExit(stock.getId());
            stockExit.setUuid(stock.getUuid());
            stock.getItems().stream().forEach(item -> {
                stockExit.addItem(item.getItemId(), item.getQuantity(), item.getPrice(), item.getUuid(), item.getId());
            });
            return stockExit;
        }).collect(Collectors.toList());
    }
}
