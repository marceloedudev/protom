package com.github.marceloedudev.config;


import com.github.marceloedudev.packages.logger.LoggerAdapter;
import io.quarkus.runtime.configuration.ProfileManager;

public class ConfigMode {

    private final LoggerAdapter log = LoggerAdapter.getLogger(ConfigMode.class);

    private String profile;

    public ConfigMode() {
        this.profile = ProfileManager.getActiveProfile().toUpperCase();
        log.info("The application is starting with profile " + this.profile);
    }

    public boolean isDevelopment() {
        return this.profile.equals("DEV");
    }

    public boolean isTest() {
        return this.profile.equals("TEST");
    }

    public boolean isProduction() {
        return this.profile.equals("PROD");
    }
}
