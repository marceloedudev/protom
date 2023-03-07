package controllers

import (
	"catalog-service/application/appdto"
	"catalog-service/domain"
	"catalog-service/infra/infradto"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ListItemsController godoc
// @Summary List Items
// @Description
// @Tags items
// @Accept json
// @Param Authorization header string true "Insert your access token" default(Bearer 508afb69-1bf0-45bc-afcc-be93d1f7ab6a)
// @Success 200 {array} infradto.ListItemsResponse
// @Router /catalog/v1/ [get]
func (s *Controller) ListItemsController() gin.HandlerFunc {
	return func(c *gin.Context) {
		items, err := s.ApplicationFactory.Query.ListItemsQuery(c)
		if err.HasErrors() {
			panic(domain.BadRequestException(err))
		}
		itemList := []infradto.ListItemsResponse{}
		for _, item := range items {
			itemList = append(itemList, infradto.ListItemsResponse{
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
		c.JSON(http.StatusOK, itemList)
	}
}

// CreateItemController godoc
// @Summary Create Item
// @Description
// @Tags items
// @Accept json
// @Param Authorization header string true "Insert your access token" default(Bearer 508afb69-1bf0-45bc-afcc-be93d1f7ab6a)
// @Param item body infradto.CreateItemRequest true "Data item"
// @Success 200 {object} infradto.CreateItemResponse
// @Router /catalog/v1/ [post]
func (s *Controller) CreateItemController() gin.HandlerFunc {
	return func(c *gin.Context) {
		var input infradto.CreateItemRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			panic("Invalid body")
		}
		item, err := s.ApplicationFactory.Usecase.CreateItemUsecase(c, appdto.CreateItemInput{
			Description: input.Description,
			Price: input.Price,
			Width: input.Width,
			Height: input.Height,
			Length: input.Length,
			Weight: input.Weight,
			Volume: input.Volume,
			Density: input.Density,
		})
		if err.HasErrors() {
			panic(domain.BadRequestException(err))
		}
		newItem := &infradto.CreateItemResponse{
			Description: item.Description,
			Price: item.Price,
			Width: item.Width,
			Height: item.Height,
			Length: item.Length,
			Weight: item.Weight,
			Volume: item.Volume,
			Density: item.Density,
			UUID: item.UUID,
		}
		c.JSON(http.StatusCreated, newItem)
	}
}
