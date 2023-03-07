package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.memory;


import com.github.marceloedudev.stockserviceconsumer.packages.queue.MessageHandler;

import java.util.ArrayList;
import java.util.Map;

public class AMQPQueue {

    private String queueName;
    private boolean durable;
    private boolean exclusive;
    private boolean autoDelete;
    private Map<String, Object> queueArguments;

    private ArrayList<MessageHandler> subscribers;

    public AMQPQueue(String queueName, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> queueArguments) {
        this.queueName = queueName;
        this.durable = durable;
        this.exclusive = exclusive;
        this.autoDelete = autoDelete;
        this.queueArguments = queueArguments;
    }

    public String getQueueName() {
        return queueName;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    public boolean isDurable() {
        return durable;
    }

    public void setDurable(boolean durable) {
        this.durable = durable;
    }

    public boolean isExclusive() {
        return exclusive;
    }

    public void setExclusive(boolean exclusive) {
        this.exclusive = exclusive;
    }

    public boolean isAutoDelete() {
        return autoDelete;
    }

    public void setAutoDelete(boolean autoDelete) {
        this.autoDelete = autoDelete;
    }

    public Map<String, Object> getQueueArguments() {
        return queueArguments;
    }

    public void setQueueArguments(Map<String, Object> queueArguments) {
        this.queueArguments = queueArguments;
    }

    public ArrayList<MessageHandler> getSubscribers() {
        return subscribers;
    }

    public void setSubscribers(ArrayList<MessageHandler> subscribers) {
        this.subscribers = subscribers;
    }
}
