package domain

import (
	"catalog-service/config"

	"github.com/jmoiron/sqlx"
)

type IDatabase interface {
	Connect(conf *config.Config) (*sqlx.DB, error)
}
