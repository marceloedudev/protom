package queries

import (
	"catalog-service/application/appdto"
	"catalog-service/domain"
	"context"
)

func (q *Queries) ListItemsQuery(ctx context.Context) ([]appdto.ListItemsOutput, domain.NotificationErrors) {
	items, err := q.DAO.ItemDAO.ListItems(ctx)
	if err != nil {
		var exception domain.NotificationErrors
		exception.AddError(err.Error())
		return nil, exception
	}
	return domain.ItemsToOutputMapper(items), nil
}
