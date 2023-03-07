package usecases

import (
	"catalog-service/domain"
	"catalog-service/packages/uuid"
)

type Usecases struct {
	DAO *domain.DAOFactory
	Repository *domain.RepositoryFactory
	UUID *uuid.UUIDAdapter
}

func NewUsecase(daoFactory *domain.DAOFactory, repositoryFactory *domain.RepositoryFactory, uuid *uuid.UUIDAdapter) *Usecases {
	return &Usecases{
		DAO: daoFactory,
		Repository: repositoryFactory,
		UUID: uuid,
	}
}
