package usecases_test

import (
	"catalog-service/application/appdto"
	"catalog-service/ctxtests"
	"context"
	"testing"

	"github.com/jaswdr/faker"
	"github.com/stretchr/testify/assert"
)

func Test_CreateItemUsecase(t *testing.T) {
	t.Run("should return a list of items", func(t *testing.T) {
		baseTests := ctxtests.GetBootBaseTest()
		usecases := baseTests.Usecases
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
		item, derr := usecases.CreateItemUsecase(context.Background(), input)
		assert.NotNil(t, item)
		assert.Equal(t, false, derr.HasErrors())
	})
}
