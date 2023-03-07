package com.github.marceloedudev.packages.rabbitmq.memory;

import com.github.marceloedudev.domain.rabbitmq.AMPQExchangeType;
import com.github.marceloedudev.domain.rabbitmq.AMQPBasicProperties;
import com.github.marceloedudev.domain.rabbitmq.AMQPChannel;
import com.github.marceloedudev.packages.queue.MessageHandler;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Envelope;

import java.io.IOException;
import java.util.*;

public class AMQPChannelMemoryAdapter implements AMQPChannel {
    private Map<String, AMQPQueue> queues;
    private Map<String, AMQPExchange> exchanges;

    public AMQPChannelMemoryAdapter() {
        this.queues = new HashMap<>();
        this.exchanges = new HashMap<>();
    }

    @Override
    public void setChannel(Channel channel) {
    }

    @Override
    public void basicPublish(String queueName, String exchangeName, String message) {
        this.basicPublish(queueName, exchangeName, message, new AMQPBasicProperties());
    }

    @Override
    public void basicPublish(String queueName, String exchangeName, String message, AMQPBasicProperties basicProperties) {
        if (!this.exchanges.containsKey(exchangeName)) {
            throw new RuntimeException("Publish to non-existing exchange " + exchangeName);
        }
        AMQPExchange currentExchange = this.exchanges.get(exchangeName);
        var matchingBindings = this.exchanges.get(exchangeName).getBindings().stream().filter((binding) -> currentExchange.getRoutingKey().matches(binding.getRegex())).toList();
        AMQPQueue currentQueue = this.queues.get(queueName);
        matchingBindings.stream().forEach(binding -> {
            var subscribers = currentQueue.getSubscribers();
            subscribers.stream().forEach(subscriber -> {
                if (subscriber != null) {
                    Envelope envelope = new Envelope(1, false, exchangeName, currentExchange.getRoutingKey());
                    try {
                        subscriber.handleDelivery("s", envelope, basicProperties.getBasicProperties(), message.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            });
        });
    }

    @Override
    public void exchangeDeclare(String exchangeName, AMPQExchangeType typeExchange, boolean durable) throws IOException {
        var exchange = new AMQPExchange(exchangeName, typeExchange, durable, new ArrayList<>());
        this.exchanges.put(exchangeName, exchange);
    }

    @Override
    public void queueDeclare() throws IOException {
    }

    @Override
    public void basicConsume(String queueName, boolean autoAck, MessageHandler consumer) throws IOException {
        if (!this.queues.containsKey(queueName)) {
            throw new RuntimeException(String.format("Queue %s not found", queueName));
        }
        AMQPQueue currentQueue = this.queues.get(queueName);
        AMQPQueue queueUpdated = currentQueue;
        List<MessageHandler> subscribers = queueUpdated.getSubscribers();
        if (subscribers == null) {
            var list = new ArrayList<MessageHandler>();
            list.add(consumer);
            queueUpdated.setSubscribers(list);
            subscribers = queueUpdated.getSubscribers();
        } else {
            subscribers.add(consumer);
        }
        queueUpdated.setSubscribers((ArrayList<MessageHandler>) subscribers);
        this.queues.put(queueName, queueUpdated);
    }

    @Override
    public void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete) throws IOException {
        this.queueDeclare(queueName, durable, exclusive, autoDelete, new HashMap<>());
    }

    @Override
    public void queueDeclare(String queueName, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> queueArguments) throws IOException {
        var queue = new AMQPQueue(queueName, durable, exclusive, autoDelete, queueArguments);
        this.queues.put(queueName, queue);
    }

    @Override
    public void queueBind(String queue, String exchange, String routingKey) throws IOException {
        if (!this.exchanges.containsKey(exchange)) {
            throw new RuntimeException("Bind to non-existing exchange " + exchange);
        }
        String routingKeyFormatted = routingKey;
        routingKeyFormatted.replaceAll("\\.", ".")
                .replaceAll("(\\S)+", "#")
                .replaceAll("\\w+", "*");
        String regex = String.format("^%s$", routingKeyFormatted);
        AMQPExchange currentExchange = this.exchanges.get(exchange);
        var binding = new AMQPBindings(regex, queue);
        List<AMQPBindings> bindings = Arrays.asList(binding);
        var exchangeEx = new AMQPExchange(exchange, currentExchange.getTypeExchange(), currentExchange.isDurable(), bindings);
        exchangeEx.setRoutingKey(routingKey);
        this.exchanges.put(exchange, exchangeEx);
    }
}
