package com.github.marceloedudev.domain.entity;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

public enum EventQueueName {
    PLACE_ORDER("queue-place-order", true, true,3, 6),
    ORDER_CANCELLED("queue-order-cancelled", true, true,3, 6),
    REJECT_ORDER("queue-reject-order", true, true,3, 6),
    ORDER_PLACED("queue-order-placed", true, true,3, 6),
    ORDER_CANCELLED_STOCK("queue-order-cancelled-stock", true, true,3, 6);

    private String queueName;

    private boolean dlqEnabled;

    private boolean retryEnabled;

    private int maxRetryAttempt;

    private int interval;

    private String exchangeName;

    private String retryName;

    private String dlqName;

    EventQueueName(String queueName, boolean dlqEnabled, boolean retryEnabled, int maxRetryAttempt, int interval) {
        this.queueName = queueName;
        this.dlqEnabled = dlqEnabled;
        this.retryEnabled = retryEnabled;
        this.maxRetryAttempt = maxRetryAttempt;
        this.interval = interval;
        this.exchangeName = this.queueName + "-exchange";
        this.retryName = this.queueName + "-retry";
        this.dlqName = this.queueName + "-dlq";
    }

    public long getRetryInterval(long count) {
        return Duration.of(interval * count, ChronoUnit.SECONDS).toMillis();
    }

    public String getQueueName() {
        return queueName;
    }

    public boolean isDlqEnabled() {
        return dlqEnabled;
    }

    public boolean isRetryEnabled() {
        return retryEnabled;
    }

    public int getMaxRetryAttempt() {
        return maxRetryAttempt;
    }

    public int getInterval() {
        return interval;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public String getRetryName() {
        return retryName;
    }

    public String getDlqName() {
        return dlqName;
    }
}
