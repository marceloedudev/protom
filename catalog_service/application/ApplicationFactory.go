package application

import (
	"catalog-service/application/queries"
	"catalog-service/application/usecases"
)

type ApplicationFactory struct {
	Query *queries.Queries
	Usecase *usecases.Usecases
}

func NewApplicationFactory(query *queries.Queries, usecase *usecases.Usecases) *ApplicationFactory {
	return &ApplicationFactory{
		Query: query,
		Usecase: usecase,
	}
}
