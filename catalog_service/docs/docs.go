// Package docs GENERATED BY SWAG; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/catalog/v1/": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "items"
                ],
                "summary": "List Items",
                "parameters": [
                    {
                        "type": "string",
                        "default": "Bearer 508afb69-1bf0-45bc-afcc-be93d1f7ab6a",
                        "description": "Insert your access token",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/infradto.ListItemsResponse"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "items"
                ],
                "summary": "Create Item",
                "parameters": [
                    {
                        "type": "string",
                        "default": "Bearer 508afb69-1bf0-45bc-afcc-be93d1f7ab6a",
                        "description": "Insert your access token",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "Data item",
                        "name": "item",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/infradto.CreateItemRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/infradto.CreateItemResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "infradto.CreateItemRequest": {
            "type": "object",
            "properties": {
                "density": {
                    "type": "integer",
                    "example": 87
                },
                "description": {
                    "type": "string",
                    "example": "Mouse"
                },
                "height": {
                    "type": "integer",
                    "example": 22
                },
                "length": {
                    "type": "integer",
                    "example": 14
                },
                "price": {
                    "type": "number",
                    "example": 301.5
                },
                "volume": {
                    "type": "integer",
                    "example": 86
                },
                "weight": {
                    "type": "integer",
                    "example": 15
                },
                "width": {
                    "type": "integer",
                    "example": 32
                }
            }
        },
        "infradto.CreateItemResponse": {
            "type": "object",
            "properties": {
                "density": {
                    "type": "integer",
                    "example": 87
                },
                "description": {
                    "type": "string",
                    "example": "Mouse"
                },
                "height": {
                    "type": "integer",
                    "example": 22
                },
                "length": {
                    "type": "integer",
                    "example": 14
                },
                "price": {
                    "type": "number",
                    "example": 301.5
                },
                "uuid": {
                    "type": "string",
                    "example": "d65010c3-f49b-44f1-b7ae-de0da2ffb732"
                },
                "volume": {
                    "type": "integer",
                    "example": 86
                },
                "weight": {
                    "type": "integer",
                    "example": 15
                },
                "width": {
                    "type": "integer",
                    "example": 32
                }
            }
        },
        "infradto.ListItemsResponse": {
            "type": "object",
            "properties": {
                "density": {
                    "type": "integer",
                    "example": 87
                },
                "description": {
                    "type": "string",
                    "example": "Mouse"
                },
                "height": {
                    "type": "integer",
                    "example": 22
                },
                "length": {
                    "type": "integer",
                    "example": 14
                },
                "price": {
                    "type": "number",
                    "example": 301.5
                },
                "uuid": {
                    "type": "string",
                    "example": "d65010c3-f49b-44f1-b7ae-de0da2ffb732"
                },
                "volume": {
                    "type": "integer",
                    "example": 86
                },
                "weight": {
                    "type": "integer",
                    "example": 15
                },
                "width": {
                    "type": "integer",
                    "example": 32
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:5000",
	BasePath:         "/catalog/v1",
	Schemes:          []string{},
	Title:            "Catalog Service",
	Description:      "This is a basic API using Gin.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
