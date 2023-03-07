package com.github.marceloedudev.domain.errors.exceptions;

import java.util.List;

public class InternalServerException extends Exceptions {
    public InternalServerException(String message) {
        super(message, 500);
    }

    public InternalServerException(List<String> messages) {
        super(messages, 500);
    }
}
