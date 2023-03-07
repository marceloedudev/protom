test:
	go test ./...

testv:
	go test -v ./...

testcov:
	go test -v -coverprofile cover.out -tags testing ./... -failfast
	go tool cover -html=cover.out -o coverage.html

testr:
	go test -race ./...

docs_generate:
	swag init -dir ./cmd --parseDependency --parseVendor

build:
	go build ./cmd/Main.go
