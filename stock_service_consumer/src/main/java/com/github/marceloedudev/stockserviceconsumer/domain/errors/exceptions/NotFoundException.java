package com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions;

import java.util.List;

public class NotFoundException extends Exceptions {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(List<String> messages) {
        super(messages);
    }
}
