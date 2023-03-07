package com.github.marceloedudev.packages.rabbitmq.memory;

import com.github.marceloedudev.domain.rabbitmq.AMPQExchangeType;

import java.util.List;

public class AMQPExchange {

    private String exchangeName;
    private AMPQExchangeType typeExchange;
    private boolean durable;
    private List<AMQPBindings> bindings;

    private String routingKey;

    public AMQPExchange(String exchangeName, AMPQExchangeType typeExchange, boolean durable, List<AMQPBindings> bindings) {
        this.exchangeName = exchangeName;
        this.typeExchange = typeExchange;
        this.durable = durable;
        this.bindings = bindings;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public void setExchangeName(String exchangeName) {
        this.exchangeName = exchangeName;
    }

    public AMPQExchangeType getTypeExchange() {
        return typeExchange;
    }

    public void setTypeExchange(AMPQExchangeType typeExchange) {
        this.typeExchange = typeExchange;
    }

    public boolean isDurable() {
        return durable;
    }

    public void setDurable(boolean durable) {
        this.durable = durable;
    }

    public List<AMQPBindings> getBindings() {
        return bindings;
    }

    public void setBindings(List<AMQPBindings> bindings) {
        this.bindings = bindings;
    }

    public String getRoutingKey() {
        return routingKey;
    }

    public void setRoutingKey(String routingKey) {
        this.routingKey = routingKey;
    }
}
