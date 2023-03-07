package main

import (
	"catalog-service/application"
	"catalog-service/application/queries"
	"catalog-service/application/usecases"
	"catalog-service/config"
	_ "catalog-service/docs"
	"catalog-service/infra"
	"catalog-service/infra/server"
	"catalog-service/packages/database"
	"catalog-service/packages/uuid"
	"log"
)

// @title Catalog Service
// @version 1.0
// @description This is a basic API using Gin.

// @host localhost:5000
// @BasePath /catalog/v1

func main() {
	config.LoadEnv("./env")
	config := config.GetConfig()
	databaseFactory := database.DatabaseFactory{
		Config: config,
	}
	postgresDB, err := databaseFactory.GetPostgresDatabaseAdapter().Connect(config)
	if err != nil {
			log.Fatalf("Postgres error %s", err)
	}
	defer postgresDB.Close()
	log.Printf("Postgres connected: %#v", postgresDB.Stats())
	daoFactory := infra.NewDAOFactory(config, postgresDB)
	usecaseFactory := infra.NewRepositoryFactory(config, postgresDB)
	uuidAdapter := &uuid.UUIDAdapter{}
	appFactory := application.NewApplicationFactory(queries.NewQuery(daoFactory), usecases.NewUsecase(daoFactory, usecaseFactory, uuidAdapter))
	app := server.HttpServer{
		Config: config,
		ApplicationFactory: appFactory,
	}
	app.Start()
}
