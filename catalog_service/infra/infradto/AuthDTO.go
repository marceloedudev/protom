package infradto

type AuthUserRequest struct {
	ClientID string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	AccessToken string `json:"access_token"`
}


type AuthUserResponse struct {
	UserID int64 `json:"user_id"`
	Username string `json:"username"`
	Email string `json:"email"`
	FullName string `json:"fullname"`
	UserUUID string `json:"user_uuid"`
}
