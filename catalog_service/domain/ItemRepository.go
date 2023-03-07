package domain

import "context"

type ItemRepository interface {
	CreateItem(ctx context.Context, i *Item) (item *Item, err error)
}
