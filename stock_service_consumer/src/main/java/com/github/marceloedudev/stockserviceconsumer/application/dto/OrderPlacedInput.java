package com.github.marceloedudev.stockserviceconsumer.application.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderPlacedInput {

    private List<OrderPlacedItemsInput> items;

    public OrderPlacedInput() {
        this.items = new ArrayList<>();
    }

    public OrderPlacedInput(List<OrderPlacedItemsInput> items) {
        this.items = items;
    }

    public List<OrderPlacedItemsInput> getItems() {
        return items;
    }

    public void setItems(List<OrderPlacedItemsInput> items) {
        this.items = items;
    }

    public void addItem(OrderPlacedItemsInput item) {
        this.items.add(item);
    }

    @Override
    public String toString() {
        return "OrderPlacedInput{" +
                "items=" + items +
                '}';
    }
}
