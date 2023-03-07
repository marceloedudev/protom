package com.github.marceloedudev.packages.sagas.choreography;

import com.github.marceloedudev.packages.queue.MessageHandler;

public class StepMap {
    private String description;
    private MessageHandler invoke;
    private MessageHandler compensation;

    public StepMap(String description, MessageHandler invoke, MessageHandler compensation) {
        this.description = description;
        this.invoke = invoke;
        this.compensation = compensation;
    }

    public String getDescription() {
        return description;
    }

    public MessageHandler getInvoke() {
        return invoke;
    }

    public MessageHandler getCompensation() {
        return compensation;
    }
}
