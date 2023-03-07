package com.github.marceloedudev.stockserviceconsumer.domain.commands;

public interface Command<Input> {
    public void execute(Input input);
}
