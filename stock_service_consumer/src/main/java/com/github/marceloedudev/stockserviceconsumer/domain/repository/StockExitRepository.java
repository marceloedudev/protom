package com.github.marceloedudev.stockserviceconsumer.domain.repository;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;

public interface StockExitRepository {
    StockExit create(StockExit stockExit);
    void deleteAll();
}
