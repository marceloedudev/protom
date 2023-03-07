package domain

import (
	"errors"
	"strings"
)

type Token struct {
	AuthorizationToken string
}

func (t *Token) GetToken() (string, error) {
	if len(t.AuthorizationToken) <= 0 {
		return "", errors.New("Token empty")
	}
	stringArray := strings.Split(t.AuthorizationToken, " ")
	if len(stringArray) == 2 {
		return stringArray[1], nil
	}
	return "", errors.New("Invalid token")
}
