package uuid

import (
	uuid "github.com/satori/go.uuid"
)

type UUIDAdapter struct {}

func (u *UUIDAdapter) GetUUID() string {
	return uuid.NewV4().String()
}
