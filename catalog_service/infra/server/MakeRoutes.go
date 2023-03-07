package server

import (
	"catalog-service/domain"
	"catalog-service/infra/controllers"

	"github.com/gin-gonic/gin"
)


type HttpRoutes struct {
	Controller *controllers.Controller
	Services domain.ServicesFactory
}

func (r *HttpRoutes) MakeRoutes(route *gin.RouterGroup) {
	apiItem := route.Group("item", TokenAuthMiddleware(r.Services))
	{
		apiItem.GET("/", r.Controller.ListItemsController())
		apiItem.POST("/", r.Controller.CreateItemController())
	}
}
