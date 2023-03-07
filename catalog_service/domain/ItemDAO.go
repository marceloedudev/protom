package domain

import "context"

type ItemDAO interface {
	ListItems(ctx context.Context) ([]Item, error)
	FindByDescription(ctx context.Context, description string) (*Item, error)
}
