package domain_test

import (
	"catalog-service/domain"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ValidateItem(t *testing.T) {

	t.Run("should return errors on item validation", func(t *testing.T) {
		item := domain.Item{
			Description: "",
		}
		err := item.Validate()
		assert.Equal(t, true, err.HasErrors())
	})

	t.Run("should not return errors on item validation", func(t *testing.T) {
		item := domain.Item{
			Description: "Mouse",
			Price: 300.5,
			Width: 30,
			Height: 20,
			Length: 10,
			Weight: 14,
			Volume: 22,
			Density: 12,
		}
		err := item.Validate()
		assert.Equal(t, false, err.HasErrors())
	})

}
