package com.github.marceloedudev.stockserviceconsumer.infra.database.jpa;

import com.github.marceloedudev.stockserviceconsumer.models.StockExitModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockExitJPA extends JpaRepository<StockExitModel, Long> {

}
