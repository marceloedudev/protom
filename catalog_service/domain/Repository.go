package domain

import (
	"catalog-service/config"

	"github.com/jmoiron/sqlx"
)

type RepositoryFactory struct {
	Config *config.Config
	Postgresql *sqlx.DB
	ItemRepository ItemRepository
}
