package appdto

type ListItemsOutput struct {
	Description string `json:"description"`
	Price float64 `json:"price"`
	Width int64 `json:"width"`
	Height int64 `json:"height"`
	Length int64 `json:"length"`
	Weight int64 `json:"weight"`
	Volume int64 `json:"volume"`
	Density int64 `json:"density"`
	UUID string `json:"uuid" db:"uuid"`
}
