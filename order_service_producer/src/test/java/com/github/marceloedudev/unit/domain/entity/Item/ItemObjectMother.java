package com.github.marceloedudev.unit.domain.entity.Item;

import com.github.marceloedudev.domain.entity.Item;
import com.github.marceloedudev.packages.faker.FakerCommerce;
import com.github.marceloedudev.packages.faker.FakerFactory;

public class ItemObjectMother {

    private static FakerFactory fakerFactory = new FakerFactory();
    private static FakerCommerce commerce = fakerFactory.commerce();

    public static Item getRandomOrderItem() {
        Long idItem = fakerFactory.number().randomNumber();
        return ItemObjectMother.getRandomOrderItemById(idItem);
    }

    public static Item getRandomOrderItemById(Long itemId) {
        var number = fakerFactory.number();
        Double price = Double.parseDouble(commerce.price().replaceAll(",", "\\."));
        return new Item(itemId, commerce.productName(), price, number.randomDigit(), number.randomDigit(), number.randomDigit(), number.randomDigit(), number.randomDigit(), number.randomDigit());
    }

    public static Item validAndItemId() {
        return ItemDataBuilder
                .create()
                .withValidIdItem()
                .withValidDescription()
                .withValidPrice()
                .withValidWidth()
                .withValidHeight()
                .withValidLength()
                .withValidWeight()
                .withValidVolume()
                .withValidDensity()
                .build();
    }
}
