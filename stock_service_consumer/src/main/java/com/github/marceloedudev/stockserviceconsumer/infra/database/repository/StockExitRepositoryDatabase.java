package com.github.marceloedudev.stockserviceconsumer.infra.database.repository;

import com.github.marceloedudev.stockserviceconsumer.config.annotations.AddRepository;
import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockExitRepository;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.ItemStockExitJPA;
import com.github.marceloedudev.stockserviceconsumer.infra.database.jpa.StockExitJPA;
import com.github.marceloedudev.stockserviceconsumer.models.ItemStockExitModel;
import com.github.marceloedudev.stockserviceconsumer.models.StockExitModel;

@AddRepository
public class StockExitRepositoryDatabase implements StockExitRepository {
    private StockExitJPA stockExitJPA;

    private ItemStockExitJPA itemStockExitJPA;

    public StockExitRepositoryDatabase(StockExitJPA stockExitJPA, ItemStockExitJPA itemStockExitJPA) {
        this.stockExitJPA = stockExitJPA;
        this.itemStockExitJPA = itemStockExitJPA;
    }

    @Override
    public StockExit create(StockExit stockExit) {
        StockExitModel stockExitModel = new StockExitModel();
        stockExitModel.setUuid(stockExit.getUuid());
        stockExitJPA.save(stockExitModel);
        stockExit.getItemsStockExit().stream().forEach(item -> {
            ItemStockExitModel itemStockExitModel = new ItemStockExitModel();
            itemStockExitModel.setStockExitId(stockExitModel.getId());
            itemStockExitModel.setItemId(item.getIdItem());
            itemStockExitModel.setQuantity(item.getQuantity());
            itemStockExitModel.setPrice(item.getPrice());
            itemStockExitModel.setUuid(item.getUuid());
            itemStockExitJPA.save(itemStockExitModel);
            item.setIdItemStockExit(itemStockExitModel.getId());
        });
        stockExit.setIdStockExit(stockExitModel.getId());
        return stockExit;
    }

    @Override
    public void deleteAll() {
        itemStockExitJPA.deleteAll();
        stockExitJPA.deleteAll();
    }
}
