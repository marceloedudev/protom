package server

import (
	"catalog-service/domain"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleErrors() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				switch err.(type) {
				case *domain.Exception:
					{
						errorsTemplate := err.(*domain.Exception)
						errorsTemplate.Error = http.StatusText(errorsTemplate.Status)
						errorsTemplate.Timestamp = time.Now()
						errorsTemplate.Path = c.Request.URL.Path
						c.JSON(errorsTemplate.Status, errorsTemplate)
						c.Abort()
						return
					}
				default:
					{
						c.JSON(http.StatusInternalServerError, &domain.Exception{
							Message:   []string{fmt.Sprintf("%v", err)},
							Status:    http.StatusInternalServerError,
							Error:     http.StatusText(http.StatusInternalServerError),
							Timestamp: time.Now(),
							Path:      c.Request.URL.Path,
						})
						c.Abort()
						return
					}
				}
			}
		}()
		c.Next()
	}
}


func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Client-Security-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("X-XSS-Protection", "1; mode=block")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
		} else {
			c.Next()
		}
	}
}

func TokenAuthMiddleware(services domain.ServicesFactory) gin.HandlerFunc {
	return func(c *gin.Context) {
		authorizationHeader := c.GetHeader("Authorization")
		token := domain.Token{
			AuthorizationToken: authorizationHeader,
		}
		bearerToken, err := token.GetToken()
		if err != nil {
			var exception domain.NotificationErrors
			exception.AddError(err.Error())
			panic(domain.UnauthorizedException(exception))
		}
		_, err = services.AuthService.GetUserAuthenticated(bearerToken)
		if err != nil {
			var exception domain.NotificationErrors
			exception.AddError(err.Error())
			panic(domain.UnauthorizedException(exception))
		}
		c.Next()
	}
}
