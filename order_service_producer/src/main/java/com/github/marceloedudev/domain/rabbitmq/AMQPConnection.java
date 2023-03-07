package com.github.marceloedudev.domain.rabbitmq;

import java.io.IOException;

public interface AMQPConnection {
    AMQPChannel connect() throws IOException;
}
