package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.factory;

import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.memory.AMQPClientMemoryAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue.AMQPClientQueueAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue.RabbitAdapter;

public class AMQPFactory {

    public AMQPClient createAMQPQueue(RabbitAdapter rabbitAdapter) {
        return new AMQPClientQueueAdapter(rabbitAdapter);
    }

    public AMQPClient createAMQPMemory() {
        return new AMQPClientMemoryAdapter();
    }

}
