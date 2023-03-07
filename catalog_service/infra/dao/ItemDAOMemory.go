package dao

import (
	"catalog-service/domain"
	"context"
)

type ItemDAOMemory struct {
	DAO *ItemDAODatabase
}

func NewItemDAOMemory(dao *ItemDAODatabase) *ItemDAOMemory {
	return &ItemDAOMemory{
		DAO: dao,
	}
}

func (idm *ItemDAOMemory) ListItems(ctx context.Context) ([]domain.Item, error) {
	items, err := idm.DAO.ListItems(ctx)
	if err != nil {
		return nil, err
	}
	return items, nil
}

func (idm *ItemDAOMemory) FindByDescription(ctx context.Context, description string) (*domain.Item, error) {
	item, err := idm.DAO.FindByDescription(ctx, description)
	if err != nil {
		return nil, err
	}
	return item, nil
}
