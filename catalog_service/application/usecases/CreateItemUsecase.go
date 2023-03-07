package usecases

import (
	"catalog-service/application/appdto"
	"catalog-service/domain"
	"context"
	"time"
)

func (u *Usecases) CreateItemUsecase(ctx context.Context, itemInput appdto.CreateItemInput) (*appdto.CreateItemOutput, domain.NotificationErrors) {
	var item domain.Item
	item.UUID = u.UUID.GetUUID()
	current := time.Now()
	item.CreatedAt = &current
	item.UpdatedAt = &current
	item.InputToItemMapper(itemInput)
	if errors := item.Validate(); errors.HasErrors() {
		return nil, errors
	}
	existItem, err := u.DAO.ItemDAO.FindByDescription(ctx, item.Description)
	if existItem != nil {
		var exception domain.NotificationErrors
		exception.AddError("Item is already registered")
		return nil, exception
	}
	if err != nil {
		var exception domain.NotificationErrors
		exception.AddError(err.Error())
		return nil, exception
	}
	newItem, err := u.Repository.ItemRepository.CreateItem(ctx, &item)
	if err != nil {
		var exception domain.NotificationErrors
		exception.AddError(err.Error())
		return nil, exception
	}
	return newItem.ItemToOutputItemMapper(), nil
}
