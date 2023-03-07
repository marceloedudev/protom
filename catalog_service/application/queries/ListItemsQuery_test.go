package queries_test

import (
	"catalog-service/ctxtests"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ListItemsQuery(t *testing.T) {
	t.Run("should return a list of items", func(t *testing.T) {
		baseTests := ctxtests.GetBootBaseTest()
		usecases := baseTests.Usecases
		ctxtests.CreateItem(usecases)
		queries := baseTests.Queries
		items, derr := queries.ListItemsQuery(context.Background())
		assert.Equal(t, 1, len(items))
		assert.Equal(t, false, derr.HasErrors())
	})
}
