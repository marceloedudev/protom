package com.github.marceloedudev.packages.faker;

import com.github.javafaker.Faker;

public class FakerInternet {

    private Faker faker;

    public FakerInternet(Faker faker) {
        this.faker = faker;
    }

    public String emailAddress() {
        return faker.internet().emailAddress();
    }

    public String uuid() {
        return faker.internet().uuid();
    }

}
