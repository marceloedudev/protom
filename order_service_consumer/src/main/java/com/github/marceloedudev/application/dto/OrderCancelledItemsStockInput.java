package com.github.marceloedudev.application.dto;

public class OrderCancelledItemsStockInput {
    private Long idItem;
    private int quantity;

    private Double price;

    public OrderCancelledItemsStockInput() {
    }

    public OrderCancelledItemsStockInput(Long idItem, int quantity, Double price) {
        this.idItem = idItem;
        this.quantity = quantity;
        this.price = price;
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

    @Override
    public String toString() {
        return "OrderCancelledItemsStockInput{" +
                "idItem=" + idItem +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
