package com.github.marceloedudev.config;

public class ConfigFactory {

    public static ConfigMode createConfigMode() {
        return new ConfigMode();
    }

    public static ConfigApp createConfigApp() {
        return new ConfigApp();
    }

}
