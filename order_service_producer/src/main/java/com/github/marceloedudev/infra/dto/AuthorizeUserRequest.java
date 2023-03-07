package com.github.marceloedudev.infra.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthorizeUserRequest {

    private String ClientID;

    private String ClientSecret;

    private String AccessToken;

    public AuthorizeUserRequest() {
    }

    public AuthorizeUserRequest(String clientID, String clientSecret, String accessToken) {
        ClientID = clientID;
        ClientSecret = clientSecret;
        AccessToken = accessToken;
    }

    @JsonProperty("client_id")
    public String getClientID() {
        return ClientID;
    }

    public void setClientID(String clientID) {
        ClientID = clientID;
    }

    @JsonProperty("client_secret")
    public String getClientSecret() {
        return ClientSecret;
    }

    public void setClientSecret(String clientSecret) {
        ClientSecret = clientSecret;
    }

    @JsonProperty("access_token")
    public String getAccessToken() {
        return AccessToken;
    }

    public void setAccessToken(String accessToken) {
        AccessToken = accessToken;
    }

    @Override
    public String toString() {
        return "AuthorizeUser{" +
                "ClientID='" + ClientID + '\'' +
                ", ClientSecret='" + ClientSecret + '\'' +
                ", AccessToken='" + AccessToken + '\'' +
                '}';
    }
}
