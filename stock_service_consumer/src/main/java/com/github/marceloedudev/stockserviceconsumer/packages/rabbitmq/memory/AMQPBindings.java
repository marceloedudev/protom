package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.memory;

public class AMQPBindings {
    private String regex;
    private String queueName;

    public AMQPBindings(String regex, String queueName) {
        this.regex = regex;
        this.queueName = queueName;
    }

    public String getRegex() {
        return regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public String getQueueName() {
        return queueName;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }
}
