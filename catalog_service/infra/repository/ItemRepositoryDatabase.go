package repository

import (
	"catalog-service/domain"
	"context"
	"errors"

	"github.com/jmoiron/sqlx"
)

type ItemRepositoryDatabase struct {
	DB *sqlx.DB
}

const (
	createItemSQL = "INSERT INTO item(description, price, width, height, length, weight, volume, density, uuid, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id"
)

func NewItemRepositoryDatabase(db *sqlx.DB) *ItemRepositoryDatabase {
	return &ItemRepositoryDatabase{
		DB: db,
	}
}

func (ir *ItemRepositoryDatabase) CreateItem(ctx context.Context, i *domain.Item) (*domain.Item, error) {
	var id int64
	if err := ir.DB.QueryRowContext(ctx, createItemSQL, i.Description, i.Price, i.Width, i.Height, i.Length, i.Weight, i.Volume, i.Density, i.UUID, i.CreatedAt, i.UpdatedAt).Scan(&id); err != nil {
		return nil, errors.New("Error create item")
	}
	item := &domain.Item{
		ID: id,
		Description: i.Description,
		Price: i.Price,
		Width: i.Width,
		Height: i.Height,
		Length: i.Length,
		Weight: i.Weight,
		Volume: i.Volume,
		Density: i.Density,
		UUID: i.UUID,
		CreatedAt: i.CreatedAt,
		UpdatedAt: i.UpdatedAt,
	}
	return item, nil
}
