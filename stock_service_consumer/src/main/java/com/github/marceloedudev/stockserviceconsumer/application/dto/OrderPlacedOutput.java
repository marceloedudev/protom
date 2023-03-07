package com.github.marceloedudev.stockserviceconsumer.application.dto;

public class OrderPlacedOutput {
    private Boolean success;
    private String message;

    public OrderPlacedOutput(String message) {
        this.success = true;
        this.message = message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
