package com.github.marceloedudev.stockserviceconsumer.domain.usecases;

public interface Usecase<Input, Output> {
    public Output execute(Input input);
}
