package com.github.marceloedudev.domain.services;

import com.github.marceloedudev.infra.dto.AuthorizeUserResponse;

public interface AuthServiceHttp {
    AuthorizeUserResponse getUserAuthenticated(String token);
}
