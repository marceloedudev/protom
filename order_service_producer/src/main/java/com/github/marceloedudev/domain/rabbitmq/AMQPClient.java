package com.github.marceloedudev.domain.rabbitmq;

import java.io.IOException;

public interface AMQPClient {
    AMQPClient connection() throws IOException;
    AMQPChannel getChannel();
}
