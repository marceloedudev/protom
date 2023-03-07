package com.github.marceloedudev.packages.crypto;

import java.util.UUID;

public class UuidAdapter implements UuidCrypto {
    public String randomUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
