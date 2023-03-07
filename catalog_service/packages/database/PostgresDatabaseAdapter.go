package database

import (
	"catalog-service/config"
	"errors"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"

	_ "github.com/jackc/pgx/stdlib"
)

type PostgresDatabaseAdapter struct {}

func (p *PostgresDatabaseAdapter) Connect(conf *config.Config) (*sqlx.DB, error) {
	source := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", conf.Postgres.Hostname, conf.Postgres.Port, conf.Postgres.Username, conf.Postgres.Password, conf.Postgres.DBName)
	db, err := sqlx.Connect(conf.Postgres.DriverName, source)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("Database postgres error: %s", err.Error()))
	}
	db.SetMaxIdleConns(30)
	db.SetMaxOpenConns(60)
	db.SetConnMaxIdleTime(time.Second * 20)
	db.SetConnMaxLifetime(time.Second * 120)
	if err = db.Ping(); err != nil {
		return nil, errors.New("Database postgres ping")
	}
	return db, nil
}
