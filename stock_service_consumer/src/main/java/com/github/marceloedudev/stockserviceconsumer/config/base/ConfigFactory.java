package com.github.marceloedudev.stockserviceconsumer.config.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConfigFactory {

    @Autowired
    private ConfigMode configMode;

    public ConfigMode configMode() {
        return configMode;
    }

}
