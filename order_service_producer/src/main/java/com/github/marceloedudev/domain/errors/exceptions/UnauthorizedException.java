package com.github.marceloedudev.domain.errors.exceptions;

import java.util.List;

public class UnauthorizedException extends Exceptions {
    public UnauthorizedException(String message) {
        super(message, 401);
    }

    public UnauthorizedException(List<String> messages) {
        super(messages, 401);
    }
}
