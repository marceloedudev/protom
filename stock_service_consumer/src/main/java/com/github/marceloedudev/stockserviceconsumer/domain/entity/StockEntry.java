package com.github.marceloedudev.stockserviceconsumer.domain.entity;

import com.github.marceloedudev.stockserviceconsumer.domain.errors.base.NotificationErrors;

import java.util.ArrayList;
import java.util.List;

public class StockEntry {
    private Long idStockEntry;

    private String uuid;

    private ArrayList<ItemStockEntry> itemsStockEntry;

    private NotificationErrors notifications;

    public StockEntry() {
        this.itemsStockEntry = new ArrayList<>();
        this.notifications = new NotificationErrors();
    }

    public ItemStockEntry addItem(Long idItem, int quantity, Double price, String uuid) {
        ItemStockEntry itemStockEntry = new ItemStockEntry(idItem, quantity, price, uuid);
        itemsStockEntry.add(itemStockEntry);
        return itemStockEntry;
    }

    public ItemStockEntry addItem(Long idItem, int quantity, Double price, String uuid, Long idItemStockExit) {
        ItemStockEntry itemStockEntry = new ItemStockEntry(idItem, quantity, price, uuid);
        itemStockEntry.setIdItemStockEntry(idItemStockExit);
        itemsStockEntry.add(itemStockEntry);
        return itemStockEntry;
    }

    public boolean validate() {
        if (uuid == null || uuid.length() == 0) {
            notifications.addError("uuid is required");
        }
        if (itemsStockEntry.size() == 0) {
            notifications.addError("Items not found");
        }
        return notifications.hasErrors();
    }

    public List<String> getNotifications() {
        return notifications.getErrorsMessage();
    }


    public ArrayList<ItemStockEntry> getItemsStockEntry() {
        return itemsStockEntry;
    }

    public Long getIdStockEntry() {
        return idStockEntry;
    }

    public void setIdStockEntry(Long idStockEntry) {
        this.idStockEntry = idStockEntry;
    }

    public void setItemsStockEntry(ArrayList<ItemStockEntry> itemsStockEntry) {
        this.itemsStockEntry = itemsStockEntry;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "StockEntry{" +
                "idStockEntry=" + idStockEntry +
                ", uuid='" + uuid + '\'' +
                ", itemsStockEntry=" + itemsStockEntry +
                ", notifications=" + notifications +
                '}';
    }
}
