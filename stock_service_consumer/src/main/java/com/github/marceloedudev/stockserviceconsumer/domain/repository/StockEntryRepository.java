package com.github.marceloedudev.stockserviceconsumer.domain.repository;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockEntry;

public interface StockEntryRepository {
    StockEntry create(StockEntry stockEntry);
    void deleteAll();
}
