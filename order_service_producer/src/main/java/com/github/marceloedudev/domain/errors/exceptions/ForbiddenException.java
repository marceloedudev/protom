package com.github.marceloedudev.domain.errors.exceptions;

import java.util.List;

public class ForbiddenException extends Exceptions {
    public ForbiddenException(String message) {
        super(message, 403);
    }

    public ForbiddenException(List<String> messages) {
        super(messages, 403);
    }
}
