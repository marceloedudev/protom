package com.github.marceloedudev.stockserviceconsumer.infra.database.jpa;

import com.github.marceloedudev.stockserviceconsumer.models.StockEntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockEntryJPA extends JpaRepository<StockEntryModel, Long> {

}
