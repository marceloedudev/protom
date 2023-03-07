package services

import "catalog-service/infra/infradto"

type AuthServiceMemory struct {

}

func NewAuthServiceMemory() *AuthServiceMemory {
	return &AuthServiceMemory{
	}
}

func (a *AuthServiceMemory) GetUserAuthenticated(accessToken string) (user *infradto.AuthUserResponse, err error) {
	user = &infradto.AuthUserResponse{
		UserID: 1,
		Username: "username",
		Email: "name@gmail.com",
		FullName: "Full name",
		UserUUID: "846c6e5c-3a92-4783-a4fc-8e1fbd1e5e27",
	}
	return user, nil
}
