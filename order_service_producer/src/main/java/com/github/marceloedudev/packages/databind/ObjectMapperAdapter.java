package com.github.marceloedudev.packages.databind;

public interface ObjectMapperAdapter {
    static ObjectMapperImpl getFactory() {
        return new ObjectMapperImpl();
    }

    String writeValueAsString(Object value) throws Exception;
}
