package domain

import (
	"net/http"
	"time"
)

type Exception struct {
	Message   []string    `json:"message"`
	Status    int       `json:"status"`
	Error     string    `json:"error"`
	Path      string    `json:"path"`
	Timestamp time.Time `json:"timestamp"`
}

func NewException(status int, message []string) *Exception {
	return &Exception{
		Message: message,
		Status:  status,
	}
}

func BadRequestException(err NotificationErrors) *Exception {
	return NewException(http.StatusBadRequest, validatorError(err))
}

func NotFoundException(err error) *Exception {
	return NewException(http.StatusNotFound, []string{err.Error()})
}

func UnauthorizedException(err NotificationErrors) *Exception {
	return NewException(http.StatusUnauthorized, validatorError(err))
}

func validatorError(err NotificationErrors) []string {
	defaultMessage := "Internal server error"
	if err == nil {
		return []string{defaultMessage}
	}
	return err.GetErrorsMessage()
}
