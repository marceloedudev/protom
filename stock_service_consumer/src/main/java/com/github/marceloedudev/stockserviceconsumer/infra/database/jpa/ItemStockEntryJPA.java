package com.github.marceloedudev.stockserviceconsumer.infra.database.jpa;

import com.github.marceloedudev.stockserviceconsumer.models.ItemStockEntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemStockEntryJPA extends JpaRepository<ItemStockEntryModel, Long> {
}
