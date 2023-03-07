package ctxtests

import (
	"catalog-service/application"
	"catalog-service/application/queries"
	"catalog-service/application/usecases"
	"catalog-service/config"
	"catalog-service/domain"
	"catalog-service/infra"
	"catalog-service/packages/database"
	"catalog-service/packages/uuid"
	"log"
	"os"
)

type AppBaseTest struct {
	Config *config.Config
	ApplicationFactory *application.ApplicationFactory
	Queries *queries.Queries
	Usecases *usecases.Usecases
	DAO *domain.DAOFactory
	Repository *domain.RepositoryFactory
	UUID *uuid.UUIDAdapter
}

func GetBootBaseTest() *AppBaseTest {
	os.Setenv("GOLANG_ENV", "test")
	config.LoadEnv("../../env")
	config := config.GetConfig()
	err := database.SetEnvDBFakePath("../..")
	if err != nil {
		log.Fatalf("DB fake failed: %v", err)
	}
	databaseFactory := database.DatabaseFactory{
		Config: config,
	}
	postgresDB, err := databaseFactory.GetPostgresDatabaseAdapter().Connect(config)
	if err != nil {
		log.Fatalf("Postgres error %s", err)
	}
	// defer postgresDB.Close()
	daoFactory := infra.NewDAOFactory(config, postgresDB)
	repositoryFactory := infra.NewRepositoryFactory(config, postgresDB)
	uuidAdapter := &uuid.UUIDAdapter{}
	queries := &queries.Queries{
		DAO: daoFactory,
	}
	usecases := &usecases.Usecases{
		DAO: daoFactory,
		Repository: repositoryFactory,
		UUID: uuidAdapter,
	}
	return &AppBaseTest{
		Config: config,
		ApplicationFactory: application.NewApplicationFactory(queries, usecases),
		Queries: queries,
		Usecases: usecases,
		DAO: daoFactory,
		Repository: repositoryFactory,
		UUID: uuidAdapter,
	}
}
