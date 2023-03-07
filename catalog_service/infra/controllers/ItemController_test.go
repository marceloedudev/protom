package controllers_test

import (
	"bytes"
	"catalog-service/application/appdto"
	"catalog-service/ctxtests"
	"catalog-service/infra/infradto"
	"catalog-service/infra/server"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/jaswdr/faker"
	"github.com/stretchr/testify/assert"
)

func Test_ListItemsController(t *testing.T) {

	t.Run("should be able items list", func(t *testing.T) {
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
		usecases.CreateItemUsecase(context.Background(), input)

		app := server.HttpServer{
			Config: baseTests.Config,
			ApplicationFactory: baseTests.ApplicationFactory,
		}
		testRouter := app.Start()
		req, err := http.NewRequest("GET", "/catalog/v1/item/", nil)
		req.Header.Add("Content-Type", "application/json")
		token := "508afb69-1bf0-45bc-afcc-be93d1f7ab6a"
		req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
		if err != nil {
			fmt.Println(err)
		}
		resp := httptest.NewRecorder()
		testRouter.ServeHTTP(resp, req)
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		res := []appdto.ListItemsOutput{}
		json.Unmarshal(body, &res)
		assert.Equal(t, 200, resp.Result().StatusCode)
		assert.Equal(t, 1, len(res))
	})

}

func Test_CreateItemController(t *testing.T) {

	t.Run("should be able create item", func(t *testing.T) {
		fake := faker.New()
		item := &infradto.CreateItemRequest{
			Description: fake.Lorem().Sentence(10),
			Price: fake.RandomFloat(10, 10, 800),
			Width: fake.Int64Between(1, 128),
			Height: fake.Int64Between(1, 128),
			Length: fake.Int64Between(1, 128),
			Weight: fake.Int64Between(1, 128),
			Volume: fake.Int64Between(1, 128),
			Density: fake.Int64Between(1, 128),
		}
		baseTests := ctxtests.GetBootBaseTest()
		app := server.HttpServer{
			Config: baseTests.Config,
			ApplicationFactory: baseTests.ApplicationFactory,
		}
		testRouter := app.Start()
		data, _ := json.Marshal(item)
		req, err := http.NewRequest("POST", "/catalog/v1/item/", bytes.NewBufferString(string(data)))
		req.Header.Add("Content-Type", "application/json")
		token := "508afb69-1bf0-45bc-afcc-be93d1f7ab6a"
		req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
		if err != nil {
			fmt.Println(err)
		}
		resp := httptest.NewRecorder()
		testRouter.ServeHTTP(resp, req)
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		res := appdto.CreateItemOutput{}
		json.Unmarshal(body, &res)
		assert.Equal(t, 201, resp.Result().StatusCode)
		assert.NotNil(t, res)
		assert.NotNil(t, res.UUID)
		assert.Equal(t, item.Description, res.Description)
	})

}
