package com.github.marceloedudev.stockserviceconsumer.domain.dao;

import com.github.marceloedudev.stockserviceconsumer.domain.entity.StockExit;

import java.util.List;

public interface StockExitDAO {
    List<StockExit> findAll();
}
