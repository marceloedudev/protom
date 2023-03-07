package infradto

type CreateItemRequest struct {
	Description string `json:"description" example:"Mouse"`
	Price float64 `json:"price" example:"301.5"`
	Width int64 `json:"width" example:"32"`
	Height int64 `json:"height" example:"22"`
	Length int64 `json:"length" example:"14"`
	Weight int64 `json:"weight" example:"15"`
	Volume int64 `json:"volume" example:"86"`
	Density int64 `json:"density" example:"87"`
}

type CreateItemResponse struct {
	Description string `json:"description" example:"Mouse"`
	Price float64 `json:"price" example:"301.5"`
	Width int64 `json:"width" example:"32"`
	Height int64 `json:"height" example:"22"`
	Length int64 `json:"length" example:"14"`
	Weight int64 `json:"weight" example:"15"`
	Volume int64 `json:"volume" example:"86"`
	Density int64 `json:"density" example:"87"`
	UUID string `json:"uuid" db:"uuid" example:"d65010c3-f49b-44f1-b7ae-de0da2ffb732"`
}


type ListItemsResponse struct {
	Description string `json:"description" example:"Mouse"`
	Price float64 `json:"price" example:"301.5"`
	Width int64 `json:"width" example:"32"`
	Height int64 `json:"height" example:"22"`
	Length int64 `json:"length" example:"14"`
	Weight int64 `json:"weight" example:"15"`
	Volume int64 `json:"volume" example:"86"`
	Density int64 `json:"density" example:"87"`
	UUID string `json:"uuid" db:"uuid" example:"d65010c3-f49b-44f1-b7ae-de0da2ffb732"`
}

