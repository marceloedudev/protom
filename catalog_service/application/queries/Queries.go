package queries

import "catalog-service/domain"

type Queries struct {
	DAO *domain.DAOFactory
}

func NewQuery(daoFactory *domain.DAOFactory) *Queries {
	return &Queries{
		DAO: daoFactory,
	}
}
