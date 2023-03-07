package com.github.marceloedudev.stockserviceconsumer.domain.errors.base;

public class AppError extends RuntimeException {

    public AppError(String message) {
        super(message);
    }
    
}
