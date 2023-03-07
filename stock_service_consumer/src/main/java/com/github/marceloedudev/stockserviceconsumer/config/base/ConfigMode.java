package com.github.marceloedudev.stockserviceconsumer.config.base;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigMode {
    @Value("${app.profile:}")
    private String activeProfile;

    public boolean isDevelopment() {
        printCheck();
        return activeProfile.equals("dev");
    }

    public boolean isTest() {
        printCheck();
        return activeProfile.equals("test");
    }

    public boolean isProduction() {
        printCheck();
        return activeProfile.equals("production");
    }

    private void printCheck() {
        System.out.println("#########################################################");
        System.out.printf("################### activeProfile: %s ################", activeProfile);
        System.out.println("#########################################################");
    }
}
