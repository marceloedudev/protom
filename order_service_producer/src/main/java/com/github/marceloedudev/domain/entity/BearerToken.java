package com.github.marceloedudev.domain.entity;

import com.github.marceloedudev.domain.errors.base.NotificationErrors;

import java.util.List;

public class BearerToken {

    private String value;

    private NotificationErrors notifications;

    public BearerToken(String value) {
        this.value = value;
        notifications = new NotificationErrors();
    }

    public String getValue() {
        return value.replace("Bearer ", "");
    }

    public boolean validate() {
        if (value == null || value.isEmpty() || value.isBlank()) {
            notifications.addError("Invalid token");
        }
        return notifications.hasErrors();
    }

    public List<String> getNotifications() {
        return notifications.getErrorsMessage();
    }

}
