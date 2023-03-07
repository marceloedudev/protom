package domain

import (
	"catalog-service/application/appdto"
	"time"
)

type Item struct {
	ID int64 `json:"id"`
	Description string `json:"description" db:"description"`
	Price float64 `json:"price" db:"price"`
	Width int64 `json:"width" db:"width"`
	Height int64 `json:"height" db:"height"`
	Length int64 `json:"length" db:"length"`
	Weight int64 `json:"weight" db:"weight"`
	Volume int64 `json:"volume" db:"volume"`
	Density int64 `json:"density" db:"density"`
	UUID string `json:"uuid" db:"uuid"`
	CreatedAt *time.Time `json:"created_at" db:"created_at"`
	UpdatedAt *time.Time `json:"updated_at" db:"updated_at"`
}

func ItemsToOutputMapper(inputItems []Item) (items []appdto.ListItemsOutput) {
	for _, item := range inputItems {
		items = append(items, appdto.ListItemsOutput{
			Description: item.Description,
			Price: item.Price,
			Width: item.Width,
			Height: item.Height,
			Length: item.Length,
			Weight: item.Weight,
			Volume: item.Volume,
			Density: item.Density,
			UUID: item.UUID,
		})
	}
	return items
}

func (i *Item) ItemToOutputItemMapper() *appdto.CreateItemOutput {
	item := &appdto.CreateItemOutput{}
	item.Description = i.Description
	item.Price = i.Price
	item.Width = i.Width
	item.Height = i.Height
	item.Length = i.Length
	item.Weight = i.Weight
	item.Volume = i.Volume
	item.Density = i.Density
	item.UUID = i.UUID
	return item
}

func (i *Item) InputToItemMapper(item appdto.CreateItemInput) {
	i.Description = item.Description
	i.Price = item.Price
	i.Width = item.Width
	i.Height = item.Height
	i.Length = item.Length
	i.Weight = item.Weight
	i.Volume = item.Volume
	i.Density = item.Density
}

func (i *Item) Validate() (e NotificationErrors) {
	if i.Description == "" {
		e.AddError("Description is required")
	}
	if i.Price == 0 {
		e.AddError("Price is required")
	}
	if i.Width == 0 {
		e.AddError("Width is required")
	}
	if i.Height == 0 {
		e.AddError("Height is required")
	}
	if i.Length == 0 {
		e.AddError("Length is required")
	}
	if i.Weight == 0 {
		e.AddError("Weight is required")
	}
	if i.Volume == 0 {
		e.AddError("Volume is required")
	}
	if i.Density == 0 {
		e.AddError("Density is required")
	}
	return e
}
