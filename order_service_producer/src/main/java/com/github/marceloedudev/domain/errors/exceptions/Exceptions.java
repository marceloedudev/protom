package com.github.marceloedudev.domain.errors.exceptions;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Exceptions extends RuntimeException {

    private List<String> messages;

    private int status;

    public Exceptions(String message, int status) {
        super(message);
        this.messages = Arrays.asList(message);
        this.status = status;
    }

    public Exceptions(List<String> messages, int status) {
        super(messages.stream().collect(Collectors.joining(", ")));
        this.messages = messages;
        this.status = status;
    }

    public Exceptions(String message, Throwable cause) {
        super(message, cause);
        this.messages = Arrays.asList(message);
    }

    public Exceptions(Throwable cause) {
        super(cause);
    }

    public Exceptions(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.messages = Arrays.asList(message);
    }

    public List<String> getMessages() {
        return messages;
    }

    public int getStatus() {
        return status;
    }
}
