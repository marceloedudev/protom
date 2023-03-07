package repository

import (
	"catalog-service/domain"
	"context"
)

type ItemRepositoryMemory struct {
	Repository *ItemRepositoryDatabase
}

func NewItemRepositoryMemory(repo *ItemRepositoryDatabase) *ItemRepositoryMemory {
	return &ItemRepositoryMemory{
		Repository: repo,
	}
}

func (ir *ItemRepositoryMemory) CreateItem(ctx context.Context, i *domain.Item) (item *domain.Item, err error) {
	item, err = ir.Repository.CreateItem(ctx, i)
	if err != nil {
		return nil, err
	}
	return item, nil
}
