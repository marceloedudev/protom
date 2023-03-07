package config

import "os"

type Config struct {
	Mode ModeConfig
	Port string
	Postgres PostgresConfig
	Auth AuthConfig
}

type ModeConfig struct {
	CurrentMode string
	IsDevelopment bool
	IsProduction bool
	IsTest bool
}

type PostgresConfig struct {
	Hostname string
	Port string
	Username string
	Password string
	DBName string
	DriverName string
}

type AuthConfig struct {
	ClientID string
	ClientSecret string
	ClientEndpoint string
}

func GetConfig() *Config {
	currentMode := os.Getenv("GOLANG_ENV")
	config := &Config{
		Mode: ModeConfig{
			CurrentMode: currentMode,
			IsDevelopment: currentMode == "development",
			IsProduction: currentMode == "production",
			IsTest: currentMode == "test",
		},
		Port: os.Getenv("PORT"),
		Postgres: PostgresConfig{
			Hostname: os.Getenv("POSTGRES_HOSTNAME"),
			Port: os.Getenv("POSTGRES_PORT"),
			Username: os.Getenv("POSTGRES_USERNAME"),
			Password: os.Getenv("POSTGRES_PASSWORD"),
			DBName: os.Getenv("POSTGRES_DBNAME"),
			DriverName: os.Getenv("POSTGRES_DRIVERNAME"),
		},
		Auth: AuthConfig{
			ClientID: os.Getenv("AUTH_CLIENT_ID"),
			ClientSecret: os.Getenv("AUTH_CLIENT_SECRET"),
			ClientEndpoint: os.Getenv("AUTH_CLIENT_ENDPOINT"),
		},
	}
	return config
}
