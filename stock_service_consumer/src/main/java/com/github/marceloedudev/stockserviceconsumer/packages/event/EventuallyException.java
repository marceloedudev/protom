package com.github.marceloedudev.stockserviceconsumer.packages.event;

public class EventuallyException extends RuntimeException {

    public EventuallyException(String message, Throwable t) {
        super(message, t);
    }

}
