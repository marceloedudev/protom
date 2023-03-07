package com.github.marceloedudev.stockserviceconsumer.packages.crypto;

import com.github.marceloedudev.stockserviceconsumer.domain.crypto.UuidCrypto;

import java.util.UUID;

public class UuidAdapter implements UuidCrypto {
    public String randomUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
