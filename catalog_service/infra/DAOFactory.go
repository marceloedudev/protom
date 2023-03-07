package infra

import (
	"catalog-service/config"
	"catalog-service/domain"
	"catalog-service/infra/dao"

	"github.com/jmoiron/sqlx"
)

func NewDAOFactory(config *config.Config, postgresql *sqlx.DB) *domain.DAOFactory {
	return &domain.DAOFactory{
		Config: config,
		Postgresql: postgresql,
		ItemDAO: getItemDAOFactory(config, postgresql),
	}
}

func getItemDAOFactory(config *config.Config, postgresql *sqlx.DB) domain.ItemDAO {
	itemDAODB := dao.NewItemDAODatabase(postgresql)
	if config.Mode.IsTest {
		return dao.NewItemDAOMemory(itemDAODB)	
	}
	return itemDAODB
}
