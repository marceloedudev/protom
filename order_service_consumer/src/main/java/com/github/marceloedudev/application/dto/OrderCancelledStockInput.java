package com.github.marceloedudev.application.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderCancelledStockInput {
    private List<OrderCancelledItemsStockInput> items;

    public void addItem(OrderCancelledItemsStockInput item) {
        this.items.add(item);
    }

    public OrderCancelledStockInput() {
        this.items = new ArrayList<>();
    }

    public OrderCancelledStockInput(List<OrderCancelledItemsStockInput> items) {
        this.items = items;
    }

    public List<OrderCancelledItemsStockInput> getItems() {
        return items;
    }

    public void setItems(List<OrderCancelledItemsStockInput> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "OrderCancelledStockInput{" +
                "items=" + items +
                '}';
    }
}
