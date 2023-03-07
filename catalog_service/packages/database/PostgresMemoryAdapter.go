package database

import (
	"catalog-service/config"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/jmoiron/sqlx"

	_ "github.com/mattn/go-sqlite3"
)

type PostgresMemoryAdapter struct {}

func (m *PostgresMemoryAdapter) Connect(conf *config.Config) (*sqlx.DB, error) {
	db, err := sqlx.Connect("sqlite3", ":memory:")
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1)
	err = sqliteCreateTables(db)
	if err != nil {
		log.Fatalf("Create tables failed %v", err)
	}
	log.Println("Memory database connected")
	return db, nil
}

const (
	keyDBFakePath = "dbfake_path"
)

func GetEnvDBFakePath() string {
	path := os.Getenv(keyDBFakePath)
	os.Unsetenv(keyDBFakePath)
	return path
}

func SetEnvDBFakePath(path string) error {
	err := os.Setenv(keyDBFakePath, fmt.Sprintf("%s/packages/database/dbsql/*.sql", path))
	if err != nil {
		log.Fatalf("dbfake env failed: %v", err)
		return err
	}
	return nil
}

func sqliteCreateTables(db *sqlx.DB) (err error) {
	contents, err := ioReadContentDir(GetEnvDBFakePath())
	if err != nil {
		return err
	}
	query := fmt.Sprintf("%s", strings.Join(contents, "\n"))
	_, err = db.Exec(query)
	if err != nil {
		return err
	}
	return nil
}

func ioReadContentDir(root string) ([]string, error) {
	var contents []string
	matches, err := filepath.Glob(root)
	if err != nil {
		return nil, err
	}
	for _, match := range matches {
		content, err := ioutil.ReadFile(match)
		if err != nil {
			return nil, err
		}
		contents = append(contents, string(content))
	}
	return contents, nil
}
