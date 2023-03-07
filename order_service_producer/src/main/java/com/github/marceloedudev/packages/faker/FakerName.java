package com.github.marceloedudev.packages.faker;

import com.github.javafaker.Faker;

public class FakerName {

    private Faker faker;

    public FakerName(Faker faker) {
        this.faker = faker;
    }

    public String username() {
        return faker.name().username();
    }

    public String fullName() {
        return faker.name().fullName();
    }

}
