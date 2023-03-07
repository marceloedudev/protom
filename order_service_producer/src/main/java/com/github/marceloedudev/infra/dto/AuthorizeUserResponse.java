package com.github.marceloedudev.infra.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthorizeUserResponse {

    private Long userID;

    private String username;

    private String email;

    private String FullName;

    private String userUUID;

    @JsonProperty("user_id")
    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("fullname")
    public String getFullName() {
        return FullName;
    }

    public void setFullName(String fullName) {
        FullName = fullName;
    }

    @JsonProperty("user_uuid")
    public String getUserUUID() {
        return userUUID;
    }

    public void setUserUUID(String userUUID) {
        this.userUUID = userUUID;
    }

    @Override
    public String toString() {
        return "AuthorizeUserResponse{" +
                "userID=" + userID +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", FullName='" + FullName + '\'' +
                ", userUUID='" + userUUID + '\'' +
                '}';
    }
}
