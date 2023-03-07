package infra

import (
	"catalog-service/config"
	"catalog-service/domain"
	"catalog-service/infra/repository"

	"github.com/jmoiron/sqlx"
)

func NewRepositoryFactory(config *config.Config, postgresql *sqlx.DB) *domain.RepositoryFactory {
	return &domain.RepositoryFactory{
		Config: config,
		Postgresql: postgresql,
		ItemRepository: getItemRepositoryFactory(config, postgresql),
	}
}

func getItemRepositoryFactory(config *config.Config, postgresql *sqlx.DB) domain.ItemRepository {
	itemRepositoryDB := repository.NewItemRepositoryDatabase(postgresql)
	if config.Mode.IsTest {
		return repository.NewItemRepositoryMemory(itemRepositoryDB)	
	}
	return itemRepositoryDB
}
