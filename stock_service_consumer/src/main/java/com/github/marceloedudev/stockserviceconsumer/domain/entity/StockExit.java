package com.github.marceloedudev.stockserviceconsumer.domain.entity;

import com.github.marceloedudev.stockserviceconsumer.domain.errors.base.NotificationErrors;

import java.util.ArrayList;
import java.util.List;

public class StockExit {
    private Long idStockExit;

    private String uuid;

    private ArrayList<ItemStockExit> itemsStockExit;

    private NotificationErrors notifications;

    public StockExit() {
        this.itemsStockExit = new ArrayList<>();
        this.notifications = new NotificationErrors();
    }

    public ItemStockExit addItem(Long idItem, int quantity, Double price, String uuid) {
        ItemStockExit itemStockExit = new ItemStockExit(idItem, quantity, price, uuid);
        itemsStockExit.add(itemStockExit);
        return itemStockExit;
    }

    public ItemStockExit addItem(Long idItem, int quantity, Double price, String uuid, Long idItemStockExit) {
        ItemStockExit itemStockExit = new ItemStockExit(idItem, quantity, price, uuid);
        itemStockExit.setIdItemStockExit(idItemStockExit);
        itemsStockExit.add(itemStockExit);
        return itemStockExit;
    }

    public boolean validate() {
        if (uuid == null || uuid.length() == 0) {
            notifications.addError("uuid is required");
        }
        if (itemsStockExit.size() == 0) {
            notifications.addError("Items not found");
        }
        return notifications.hasErrors();
    }

    public List<String> getNotifications() {
        return notifications.getErrorsMessage();
    }

    public ArrayList<ItemStockExit> getItemsStockExit() {
        return itemsStockExit;
    }

    public Long getIdStockExit() {
        return idStockExit;
    }

    public void setIdStockExit(Long idStockExit) {
        this.idStockExit = idStockExit;
    }

    public void setItemsStockExit(ArrayList<ItemStockExit> itemsStockExit) {
        this.itemsStockExit = itemsStockExit;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "StockExit{" +
                "idStockExit=" + idStockExit +
                ", uuid='" + uuid + '\'' +
                ", itemsStockExit=" + itemsStockExit +
                ", notifications=" + notifications +
                '}';
    }
}
