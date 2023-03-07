package domain

import "errors"

type NotificationErrors []error

func (h *NotificationErrors) AddError(e string) {
	*h = append(*h, errors.New(e))
}

func (h *NotificationErrors) HasErrors() bool {
	return len(*h) > 0
}

func (h *NotificationErrors) GetErrorsMessage() []string {
	var errors []string
	for _, e := range *h {
       errors = append(errors, e.Error())
    }
	return errors
}
