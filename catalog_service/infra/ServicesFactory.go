package infra

import (
	"catalog-service/config"
	"catalog-service/domain"
	"catalog-service/infra/services"
)

func NewServicesFactory(config *config.Config) *domain.ServicesFactory {
	return &domain.ServicesFactory{
		AuthService: getServicesFactory(config),
	}
}

func getServicesFactory(config *config.Config) domain.AuthService {
	if config.Mode.IsTest {
		return services.NewAuthServiceMemory()
	}
	return services.NewAuthServiceHttp(config)
}
