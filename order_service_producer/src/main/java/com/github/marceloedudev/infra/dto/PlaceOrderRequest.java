package com.github.marceloedudev.infra.dto;

import java.util.List;

public class PlaceOrderRequest {

    private String cpf;

    private List<PlaceOrderRequestOrderItems> orderItems;

    public PlaceOrderRequest() {
    }

    public PlaceOrderRequest(String cpf, List<PlaceOrderRequestOrderItems> orderItems) {
        this.cpf = cpf;
        this.orderItems = orderItems;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<PlaceOrderRequestOrderItems> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<PlaceOrderRequestOrderItems> orderItems) {
        this.orderItems = orderItems;
    }

    @Override
    public String toString() {
        return "PlaceOrderRequest{" +
                "cpf='" + cpf + '\'' +
                ", orderItems=" + orderItems +
                '}';
    }
}
