package com.github.marceloedudev.stockserviceconsumer.domain.queue;

public interface EventQueue<Input> {
    void execute(Input input);
}
