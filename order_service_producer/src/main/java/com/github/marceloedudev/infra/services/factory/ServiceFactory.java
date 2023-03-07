package com.github.marceloedudev.infra.services.factory;

import com.github.marceloedudev.config.ConfigFactory;
import com.github.marceloedudev.domain.services.AuthServiceHttp;
import com.github.marceloedudev.infra.services.http.AuthServiceHttpAdapter;
import com.github.marceloedudev.infra.services.memory.AuthServiceMemoryAdapter;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class ServiceFactory {

    private AuthServiceHttp authServiceHttp;

    @Inject
    public ServiceFactory(AuthServiceHttpAdapter authServiceHttpAdapter) {
        if (ConfigFactory.createConfigMode().isTest()) {
            this.authServiceHttp = new AuthServiceMemoryAdapter();
            return;
        }
        this.authServiceHttp = authServiceHttpAdapter;
    }

    public AuthServiceHttp createAuth() {
        return authServiceHttp;
    }
}
