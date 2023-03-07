package com.github.marceloedudev.packages.event;

public class EventuallyException extends RuntimeException {

    public EventuallyException(String message, Throwable t) {
        super(message, t);
    }

}
