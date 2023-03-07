package services

import (
	"bytes"
	"catalog-service/config"
	"catalog-service/infra/infradto"
	"encoding/json"
	"errors"
	"net/http"
)

type AuthServiceHttp struct {
	Config *config.Config
}

func NewAuthServiceHttp(config *config.Config) *AuthServiceHttp {
	return &AuthServiceHttp{
		Config: config,
	}
}

func (a *AuthServiceHttp) GetUserAuthenticated(accessToken string) (user *infradto.AuthUserResponse, err error) {
	input := infradto.AuthUserRequest{
		ClientID: a.Config.Auth.ClientID,
		ClientSecret: a.Config.Auth.ClientSecret,
		AccessToken: accessToken,
	}
	body, _ := json.Marshal(input)
	r, err := http.NewRequest("POST", a.Config.Auth.ClientEndpoint, bytes.NewBuffer(body))
	if err != nil {
		panic(err)
	}
	r.Header.Add("Content-Type", "application/json")
	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	derr := json.NewDecoder(res.Body).Decode(&user)
	if derr != nil {
		return nil, derr
	}
	if res.StatusCode != http.StatusOK {
		return nil, errors.New("Invalid token")
	}
	return user, nil
}
