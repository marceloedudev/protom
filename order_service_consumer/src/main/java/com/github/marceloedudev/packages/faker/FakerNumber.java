package com.github.marceloedudev.packages.faker;

import com.github.javafaker.Faker;

public class FakerNumber {

    private Faker faker;

    public FakerNumber(Faker faker) {
        this.faker = faker;
    }

    public long randomNumber() {
        return faker.number().randomNumber() + 1L;
    }

    public int randomDigit() {
        return faker.number().randomDigit() + 1;
    }

}
