package domain

import (
	"catalog-service/config"

	"github.com/jmoiron/sqlx"
)

type DAOFactory struct {
	Config *config.Config
	Postgresql *sqlx.DB
	ItemDAO ItemDAO
}
