package com.github.marceloedudev.stockserviceconsumer.domain.errors.exceptions;

import java.util.List;

public class SQLException extends Exceptions {

    public SQLException(String message) {
        super(message);
    }

    public SQLException(List<String> messages) {
        super(messages);
    }

}
