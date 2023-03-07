package com.github.marceloedudev.application.dto;

public class RejectOrderInput {
    private Long orderId;

    public RejectOrderInput() {
    }

    public RejectOrderInput(Long orderId) {
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
        return "RejectOrderInput{" +
                "orderId=" + orderId +
                '}';
    }
}
