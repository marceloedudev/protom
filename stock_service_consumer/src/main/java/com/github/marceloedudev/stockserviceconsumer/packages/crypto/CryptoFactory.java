package com.github.marceloedudev.stockserviceconsumer.packages.crypto;

import org.springframework.stereotype.Component;

@Component
public class CryptoFactory {

    public UuidAdapter uuidAdapter() {
        return new UuidAdapter();
    }

}
