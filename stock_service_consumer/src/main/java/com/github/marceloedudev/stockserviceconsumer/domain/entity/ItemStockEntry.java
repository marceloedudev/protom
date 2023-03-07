package com.github.marceloedudev.stockserviceconsumer.domain.entity;

import com.github.marceloedudev.stockserviceconsumer.domain.errors.base.NotificationErrors;

import java.util.List;

public class ItemStockEntry {
    private Long idItem;

    private int quantity;

    private Double price;

    private String uuid;

    private Long idItemStockEntry;

    private NotificationErrors notifications;

    public ItemStockEntry(Long idItem, int quantity, Double price, String uuid) {
        this.idItem = idItem;
        this.quantity = quantity;
        this.price = price;
        this.uuid = uuid;
        this.notifications = new NotificationErrors();
    }

    public boolean validate() {
        if (idItem == null || idItem == 0) {
            notifications.addError("id is required");
        }
        if (quantity == 0) {
            notifications.addError("quantity is required");
        }
        if (uuid == null || uuid.length() == 0) {
            notifications.addError("uuid is required");
        }
        return notifications.hasErrors();
    }

    public List<String> getNotifications() {
        return notifications.getErrorsMessage();
    }


    public Long getIdItem() {
        return idItem;
    }

    public void setIdItem(Long idItem) {
        this.idItem = idItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getIdItemStockEntry() {
        return idItemStockEntry;
    }

    public void setIdItemStockEntry(Long idItemStockEntry) {
        this.idItemStockEntry = idItemStockEntry;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "ItemStockEntry{" +
                "idItem=" + idItem +
                ", quantity=" + quantity +
                ", price=" + price +
                ", uuid='" + uuid + '\'' +
                ", idItemStockEntry=" + idItemStockEntry +
                '}';
    }
}
