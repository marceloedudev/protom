package com.github.marceloedudev.packages.faker;

import com.github.javafaker.Faker;

public class FakerFactory {

    private final Faker faker = new Faker();

    public FakerName name() {
        return new FakerName(faker);
    }

    public FakerInternet internet() {
        return new FakerInternet(faker);
    }

    public FakerNumber number() {
        return new FakerNumber(faker);
    }

    public FakerCommerce commerce() {
        return new FakerCommerce(faker);
    }
}
