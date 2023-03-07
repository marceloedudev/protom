package com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(RabbitTemplate.class)
public class RabbitAutoConfiguration {
    @Bean
    public RabbitAdapter rabbitAdapter(RabbitTemplate rabbitTemplate) {
        return new RabbitAdapter(rabbitTemplate);
    }
}
