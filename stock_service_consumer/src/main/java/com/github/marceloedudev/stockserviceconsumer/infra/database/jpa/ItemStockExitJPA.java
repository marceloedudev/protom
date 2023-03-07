package com.github.marceloedudev.stockserviceconsumer.infra.database.jpa;

import com.github.marceloedudev.stockserviceconsumer.models.ItemStockExitModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemStockExitJPA extends JpaRepository<ItemStockExitModel, Long> {
}
