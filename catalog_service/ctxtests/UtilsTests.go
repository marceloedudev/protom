package ctxtests

import (
	"catalog-service/application/appdto"
	"catalog-service/application/usecases"
	"catalog-service/domain"
	"context"

	"github.com/jaswdr/faker"
)

func CreateItem(usecases *usecases.Usecases) (*appdto.CreateItemOutput, domain.NotificationErrors) {
	fake := faker.New()
	input := appdto.CreateItemInput{
		Description: fake.Lorem().Sentence(10),
		Price: fake.RandomFloat(10, 10, 800),
		Width: fake.Int64Between(1, 128),
		Height: fake.Int64Between(1, 128),
		Length: fake.Int64Between(1, 128),
		Weight: fake.Int64Between(1, 128),
		Volume: fake.Int64Between(1, 128),
		Density: fake.Int64Between(1, 128),
	}
	item, err := usecases.CreateItemUsecase(context.Background(), input)
	if err.HasErrors() {
		return nil, err
	}
	return item, nil
}
