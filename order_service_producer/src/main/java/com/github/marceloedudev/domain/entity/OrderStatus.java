package com.github.marceloedudev.domain.entity;

import com.github.marceloedudev.domain.errors.exceptions.BadRequestException;

public enum OrderStatus {
    WAITING(1),
    CANCELED(2),
    REJECTED(3),
    APPROVED(4),
    PURCHASED(5),
    SHIPPED(6),
    DELIVERED(7),
    RETURNED(8);

    private int code;

    private OrderStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static OrderStatus valueOf(int code) {
        for (OrderStatus value : OrderStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new BadRequestException("Invalid order status code");
    }
}
