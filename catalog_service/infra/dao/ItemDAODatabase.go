package dao

import (
	"catalog-service/domain"
	"context"
	"database/sql"
	"errors"

	"github.com/jmoiron/sqlx"
)

type ItemDAODatabase struct {
	DB *sqlx.DB
}

const (
	listItemsSQL = "SELECT description, price, width, height, length, weight, volume, density, uuid, created_at, updated_at FROM item"
	findItemByDescriptionSQL = "SELECT description, price, width, height, length, weight, volume, density, uuid, created_at, updated_at FROM item where description = $1"
)

func NewItemDAODatabase(db *sqlx.DB) *ItemDAODatabase {
	return &ItemDAODatabase{
		DB: db,
	}
}

func (ir *ItemDAODatabase) ListItems(ctx context.Context) ([]domain.Item, error) {
	rows, err := ir.DB.QueryxContext(ctx, listItemsSQL)
	if err != nil {
		return nil, errors.New("Error list items")
	}
	defer rows.Close()
	var items []domain.Item
	for rows.Next() {
		var item domain.Item
		err = rows.StructScan(&item)
		if err != nil {
			return nil, errors.New("Error item")
		}
		items = append(items, domain.Item{
			ID: item.ID,
			Description: item.Description,
			Price: item.Price,
			Width: item.Width,
			Height: item.Height,
			Length: item.Length,
			Weight: item.Weight,
			Volume: item.Volume,
			Density: item.Density,
			UUID: item.UUID,
			CreatedAt: item.CreatedAt,
			UpdatedAt: item.UpdatedAt,
		})
	}
	return items, nil
}

func (ir *ItemDAODatabase) FindByDescription(ctx context.Context, description string) (*domain.Item, error) {
	item := &domain.Item{}
	row := ir.DB.QueryRowContext(ctx, findItemByDescriptionSQL, description)
	if err := row.Scan(&item.Description, &item.Price, &item.Width, &item.Height, &item.Length, &item.Weight, &item.Volume, &item.Density, &item.UUID, &item.CreatedAt, &item.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, errors.New(err.Error())
	}
	return item, nil
}
