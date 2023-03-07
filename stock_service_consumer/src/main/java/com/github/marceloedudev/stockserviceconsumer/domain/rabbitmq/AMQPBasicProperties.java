package com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq;

import com.rabbitmq.client.AMQP;

import java.util.Date;
import java.util.Map;

public class AMQPBasicProperties {

    private String contentType;
    private String contentEncoding;
    private Map<String, Object> headers;
    private Integer deliveryMode;
    private Integer priority;
    private String correlationId;
    private String replyTo;
    private String expiration;
    private String messageId;
    private Date timestamp;
    private String type;
    private String userId;
    private String appId;
    private String clusterId;

    public AMQPBasicProperties() {
    }

    public AMQPBasicProperties(String contentType, String contentEncoding, Map<String, Object> headers, Integer deliveryMode, Integer priority, String correlationId, String replyTo, String expiration, String messageId, Date timestamp, String type, String userId, String appId, String clusterId) {
        this.contentType = contentType;
        this.contentEncoding = contentEncoding;
        this.headers = headers;
        this.deliveryMode = deliveryMode;
        this.priority = priority;
        this.correlationId = correlationId;
        this.replyTo = replyTo;
        this.expiration = expiration;
        this.messageId = messageId;
        this.timestamp = timestamp;
        this.type = type;
        this.userId = userId;
        this.appId = appId;
        this.clusterId = clusterId;
    }

    public String getContentType() {
        return contentType;
    }

    public String getContentEncoding() {
        return contentEncoding;
    }

    public Map<String, Object> getHeaders() {
        return headers;
    }

    public Integer getDeliveryMode() {
        return deliveryMode;
    }

    public Integer getPriority() {
        return priority;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public String getReplyTo() {
        return replyTo;
    }

    public String getExpiration() {
        return expiration;
    }

    public String getMessageId() {
        return messageId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getType() {
        return type;
    }

    public String getUserId() {
        return userId;
    }

    public String getAppId() {
        return appId;
    }

    public String getClusterId() {
        return clusterId;
    }

    public void setExpiration(long expiration) {
        this.expiration = String.valueOf(expiration);
    }

    public AMQP.BasicProperties getBasicProperties() {
        return new AMQP.BasicProperties(
                getContentType(),
                getContentEncoding(),
                getHeaders(),
                getDeliveryMode(),
                getPriority(),
                getCorrelationId(),
                getReplyTo(),
                getExpiration(),
                getMessageId(),
                getTimestamp(),
                getType(),
                getUserId(),
                getAppId(),
                getClusterId()
        );
    }
}
