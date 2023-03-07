package com.github.marceloedudev.stockserviceconsumer.domain.errors.messagebus;

public class MessageBusException extends RuntimeException {
    public MessageBusException(Throwable cause) {
        super(cause);
    }
}
