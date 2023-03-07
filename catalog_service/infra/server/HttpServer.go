package server

import (
	"catalog-service/application"
	"catalog-service/config"
	"catalog-service/domain"
	"catalog-service/infra"
	"catalog-service/infra/controllers"
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
)
type HttpServer struct {
	Config *config.Config
	ApplicationFactory *application.ApplicationFactory
}

func (s *HttpServer) Start() *gin.Engine {
	app := gin.Default()
	if s.Config.Mode.IsTest == false {
		app.Use(CORS())
	}
	app.Use(HandleErrors());
	services := infra.NewServicesFactory(s.Config)
	sv := HttpRoutes{
		Controller: controllers.NewController(s.ApplicationFactory),
		Services: *services,
	}
	if s.Config.Mode.IsDevelopment {
		AddSwagger(app)
	}
	api := app.Group("catalog/v1")
	{
		sv.MakeRoutes(api)
	}
	app.NoRoute(func(c *gin.Context) {
		panic(domain.NotFoundException(errors.New(fmt.Sprintf("Route '%s' was not found", c.Request.URL.Path))))
	})
	if s.Config.Mode.IsTest == false {
		app.Run()
	}
	return app
}
