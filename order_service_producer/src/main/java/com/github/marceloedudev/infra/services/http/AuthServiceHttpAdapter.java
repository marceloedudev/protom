package com.github.marceloedudev.infra.services.http;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.marceloedudev.config.ConfigApp;
import com.github.marceloedudev.config.ConfigFactory;
import com.github.marceloedudev.domain.errors.exceptions.HttpException;
import com.github.marceloedudev.domain.errors.exceptions.InternalServerException;
import com.github.marceloedudev.domain.errors.exceptions.UnauthorizedException;
import com.github.marceloedudev.domain.services.AuthServiceHttp;
import com.github.marceloedudev.infra.dto.AuthorizeUserRequest;
import com.github.marceloedudev.infra.dto.AuthorizeUserResponse;

import javax.enterprise.context.ApplicationScoped;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@ApplicationScoped
public class AuthServiceHttpAdapter implements AuthServiceHttp {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ConfigApp configApp = ConfigFactory.createConfigApp();

    public AuthorizeUserResponse getUserAuthenticated(String token) {
        try {
            AuthorizeUserRequest authorizeUserRequest = new AuthorizeUserRequest(configApp.getAppClientID(), configApp.getAppClientSecret(), token);
            String requestBody = objectMapper
                    .writeValueAsString(authorizeUserRequest);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(configApp.getAuthServiceEndpoint()))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();
            CompletableFuture<HttpResponse<String>> httpResponseCompletableFuture = httpClient.sendAsync(request,
                    HttpResponse.BodyHandlers.ofString());
            HttpResponse<String> response = httpResponseCompletableFuture.get();
            if (response.statusCode() != 200) {
                HttpException exception = objectMapper.readValue(response.body(), HttpException.class);
                throw new UnauthorizedException(exception.getMessages());
            }
            AuthorizeUserResponse authorizeUserResponse = objectMapper.readValue(response.body(), AuthorizeUserResponse.class);
            return authorizeUserResponse;
        } catch (InterruptedException e) {
            throw new InternalServerException("Internal error");
        } catch (ExecutionException e) {
            throw new InternalServerException("Error connection");
        } catch (JsonProcessingException e) {
            throw new InternalServerException("Invalid json");
        }
    }

}
