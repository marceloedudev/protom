package database

import (
	"catalog-service/config"
	"catalog-service/domain"
)

type DatabaseFactory struct {
	Config *config.Config
}

func (d *DatabaseFactory) GetPostgresDatabaseAdapter() domain.IDatabase {
	if d.Config.Mode.IsTest {
		return &PostgresMemoryAdapter{}
	}
	return &PostgresDatabaseAdapter{}
}
