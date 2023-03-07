package com.github.marceloedudev.domain.errors.exceptions;

import java.util.List;

public class BadRequestException extends Exceptions {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(List<String> messages) {
        super(messages);
    }

}
