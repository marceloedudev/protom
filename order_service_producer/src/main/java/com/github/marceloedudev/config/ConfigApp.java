package com.github.marceloedudev.config;

import org.eclipse.microprofile.config.ConfigProvider;

public class ConfigApp {

    public String getAppClientID() {
        return ConfigProvider.getConfig().getValue("app.client-id", String.class);
    }

    public String getAppClientSecret() {
        return ConfigProvider.getConfig().getValue("app.client-secret", String.class);
    }

    public String getAuthServiceEndpoint() {
        return ConfigProvider.getConfig().getValue("app.auth-service.endpoint", String.class);
    }

}
