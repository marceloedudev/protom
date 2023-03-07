package com.github.marceloedudev.application.dto;

public class OrderCancelledInput {
    private Long orderId;

    public OrderCancelledInput() {
    }

    public OrderCancelledInput(Long orderId) {
        this.orderId = orderId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public String toString() {
        return "OrderCancelledInput{" +
                "orderId=" + orderId +
                '}';
    }
}
