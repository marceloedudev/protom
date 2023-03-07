package controllers

import (
	"catalog-service/application"
)

type Controller struct {
	ApplicationFactory *application.ApplicationFactory
}

func NewController(applicationFactory *application.ApplicationFactory) *Controller {
	return &Controller{
		ApplicationFactory: applicationFactory,
	}
}
