package com.github.marceloedudev.stockserviceconsumer.domain.dao;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockEntry;

import java.util.List;

public interface StockEntryDAO {
    List<StockEntry> findAll();
}
