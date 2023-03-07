package com.github.marceloedudev.stockserviceconsumer.infra.database.repository;

import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddRepository;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockEntry;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockEntryRepository;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.ItemStockEntryJPA;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.StockEntryJPA;
import com.github.marceloedudev.stockserviceconsumer.models.ItemStockEntryModel;
import com.github.marceloedudev.stockserviceconsumer.models.StockEntryModel;

@AddRepository
public class StockEntryRepositoryDatabase implements StockEntryRepository  {
    private StockEntryJPA stockEntryJPA;

    private ItemStockEntryJPA itemStockEntryJPA;

    public StockEntryRepositoryDatabase(StockEntryJPA stockEntryJPA, ItemStockEntryJPA itemStockEntryJPA) {
        this.stockEntryJPA = stockEntryJPA;
        this.itemStockEntryJPA = itemStockEntryJPA;
    }

    @Override
    public StockEntry create(StockEntry stockEntry) {
        StockEntryModel stockEntryModel = new StockEntryModel();
        stockEntryModel.setUuid(stockEntry.getUuid());
        stockEntryJPA.save(stockEntryModel);
        stockEntry.getItemsStockEntry().stream().forEach(item -> {
            ItemStockEntryModel itemStockEntryModel = new ItemStockEntryModel();
            itemStockEntryModel.setStockEntryId(stockEntryModel.getId());
            itemStockEntryModel.setItemId(item.getIdItem());
            itemStockEntryModel.setQuantity(item.getQuantity());
            itemStockEntryModel.setPrice(item.getPrice());
            itemStockEntryModel.setUuid(item.getUuid());
            itemStockEntryJPA.save(itemStockEntryModel);
            item.setIdItemStockEntry(itemStockEntryModel.getId());
        });
        stockEntry.setIdStockEntry(stockEntryModel.getId());
        return stockEntry;
    }

    @Override
    public void deleteAll() {
        itemStockEntryJPA.deleteAll();
        stockEntryJPA.deleteAll();
    }
}
