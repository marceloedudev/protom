package com.github.marceloedudev.packages.rabbitmq.factory;

import com.github.marceloedudev.config.ConfigFactory;
import com.github.marceloedudev.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.packages.rabbitmq.memory.AMQPClientMemoryAdapter;
import com.github.marceloedudev.packages.rabbitmq.queue.AMQPClientQueueAdapter;
import io.quarkiverse.rabbitmqclient.RabbitMQClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class AMQPFactory {

    private AMQPClient amqpClient;

    @Inject
    public AMQPFactory(RabbitMQClient rabbitMQClient) {
        if (ConfigFactory.createConfigMode().isTest()) {
            this.amqpClient = new AMQPClientMemoryAdapter();
            return;
        }
        this.amqpClient = new AMQPClientQueueAdapter(rabbitMQClient);
    }

    public AMQPClient createClient() {
        return this.amqpClient;
    }

}
