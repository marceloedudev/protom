package domain

import "catalog-service/infra/infradto"

type AuthService interface {
	GetUserAuthenticated(accessToken string) (user *infradto.AuthUserResponse, err error)
}
