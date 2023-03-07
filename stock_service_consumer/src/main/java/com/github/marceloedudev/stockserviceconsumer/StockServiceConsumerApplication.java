package com.github.marceloedudev.stockserviceconsumer;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@EnableTransactionManagement
@EnableRabbit
@SpringBootApplication
public class StockServiceConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockServiceConsumerApplication.class, args);
    }

}
