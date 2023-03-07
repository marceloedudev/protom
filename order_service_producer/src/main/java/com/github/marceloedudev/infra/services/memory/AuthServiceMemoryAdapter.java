package com.github.marceloedudev.infra.services.memory;

import com.github.marceloedudev.domain.services.AuthServiceHttp;
import com.github.marceloedudev.infra.dto.AuthorizeUserResponse;
import com.github.marceloedudev.packages.faker.FakerFactory;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AuthServiceMemoryAdapter implements AuthServiceHttp  {

    private final FakerFactory fakerFactory = new FakerFactory();

    @Override
    public AuthorizeUserResponse getUserAuthenticated(String token) {
        AuthorizeUserResponse response = new AuthorizeUserResponse();
        response.setUserID(fakerFactory.number().randomNumber());
        response.setEmail(fakerFactory.internet().emailAddress());
        response.setUsername(fakerFactory.name().username());
        response.setUserUUID(fakerFactory.internet().uuid());
        response.setFullName(fakerFactory.name().fullName());
        return response;
    }
}
