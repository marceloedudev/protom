package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)


func LoadEnv(path string) {
	env := os.Getenv("GOLANG_ENV")
	if "" == env {
		env = "development"
	}
	err := godotenv.Load(fmt.Sprintf("%s/.env.%s", path, env))
	if err != nil {
		log.Printf("> error load env %s ", err.Error())
	}
}
