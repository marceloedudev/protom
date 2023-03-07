package com.github.marceloedudev.stockserviceconsumer.config.di;

import com.github.marceloedudev.stockserviceconsumer.config.base.ConfigFactory;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockEntryDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.dao.StockExitDAO;
import com.github.marceloedudev.stockserviceconsumer.domain.rabbitmq.AMQPClient;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockEntryRepository;
import com.github.marceloedudev.stockserviceconsumer.domain.repository.StockExitRepository;
import com.github.marceloedudev.stockserviceconsumer.infra.database.dao.StockEntryDAODatabase;
import com.github.marceloedudev.stockserviceconsumer.infra.database.dao.StockExitDAODatabase;
import com.github.marceloedudev.stockserviceconsumer.infra.database.repository.StockEntryRepositoryDatabase;
import com.github.marceloedudev.stockserviceconsumer.infra.database.repository.StockExitRepositoryDatabase;
import com.github.marceloedudev.stockserviceconsumer.packages.logger.LoggerAdapter;
import com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.factory.AMQPFactory;
import com.github.marceloedudev.stockserviceconsumer.packages.rabbitmq.queue.RabbitAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DIConfiguration {
    private final LoggerAdapter log = LoggerAdapter.getLogger(DIConfiguration.class);
    @Autowired
    private ConfigFactory configFactory;

    @Autowired
    private StockExitRepositoryDatabase stockExitRepositoryDatabase;

    @Autowired
    private StockExitDAODatabase stockExitDAODatabase;

    @Autowired
    private StockEntryRepositoryDatabase stockEntryRepositoryDatabase;

    @Autowired
    private StockEntryDAODatabase stockEntryDAODatabase;

    @Autowired
    private RabbitAdapter rabbitAdapter;

    @Bean(name = "amqpClient")
    public AMQPClient amqpClient() {
        AMQPFactory amqpFactory = new AMQPFactory();
        if (configFactory.configMode().isTest()) {
            return amqpFactory.createAMQPMemory();
        }
        return amqpFactory.createAMQPQueue(rabbitAdapter);
    }

    @Bean(name="stockExitRepository")
    public StockExitRepository stockExitRepository() {
        return stockExitRepositoryDatabase;
    }

    @Bean(name="stockExitDAO")
    public StockExitDAO stockExitDAO() {
        return stockExitDAODatabase;
    }

    @Bean(name="stockEntryRepository")
    public StockEntryRepository stockEntryRepository() {
        return stockEntryRepositoryDatabase;
    }

    @Bean(name="stockEntryDAO")
    public StockEntryDAO stockEntryDAO() {
        return stockEntryDAODatabase;
    }
}
