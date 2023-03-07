package com.github.marceloedudev.stockserviceconsumer.infra.database.dao;

import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockEntryDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockEntry;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.StockEntryJPA;

import java.util.List;
import java.util.stream.Collectors;

@AddDAO
public class StockEntryDAODatabase implements StockEntryDAO {
    private StockEntryJPA stockEntryJPA;

    public StockEntryDAODatabase(StockEntryJPA stockEntryJPA) {
        this.stockEntryJPA = stockEntryJPA;
    }

    @Override
    public List<StockEntry> findAll() {
        return stockEntryJPA.findAll().stream().map(stock -> {
            StockEntry stockEntry = new StockEntry();
            stockEntry.setIdStockEntry(stock.getId());
            stockEntry.setUuid(stock.getUuid());
            stock.getItems().stream().forEach(item -> {
                stockEntry.addItem(item.getItemId(), item.getQuantity(), item.getPrice(), item.getUuid(), item.getId());
            });
            return stockEntry;
        }).collect(Collectors.toList());
    }
}
