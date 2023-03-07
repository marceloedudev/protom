package com.github.marceloedudev.stockserviceconsumer.application.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderCancelledInput {

    private List<OrderCancelledItemsInput> items;

    public void addItem(OrderCancelledItemsInput item) {
        this.items.add(item);
    }

    public OrderCancelledInput() {
        this.items = new ArrayList<>();
    }

    public OrderCancelledInput(List<OrderCancelledItemsInput> items) {
        this.items = items;
    }

    public List<OrderCancelledItemsInput> getItems() {
        return items;
    }

    public void setItems(List<OrderCancelledItemsInput> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "OrderCancelledInput{" +
                "items=" + items +
                '}';
    }
}
