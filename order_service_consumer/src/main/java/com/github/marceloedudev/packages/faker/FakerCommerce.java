package com.github.marceloedudev.packages.faker;

import com.github.javafaker.Faker;

public class FakerCommerce {

    private Faker faker;

    public FakerCommerce(Faker faker) {
        this.faker = faker;
    }

    public String price() {
        return faker.commerce().price();
    }

    public String productName() {
        return faker.commerce().productName();
    }

}
