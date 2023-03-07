## Catalog Service

### Generate/Update Swagger Docs

```
swag init -g cmd/Main.go
```

[go install github.com/swaggo/swag/cmd/swag@latest](https://github.com/swaggo/swag)

Run app, and browse to http://localhost:5000/swagger/index.html

> ### 💻 Running tests

```shell script
go test -race -vet=off ./...
```

> ### ⚙️ Gitlab CICD

Variables:

-   MY_TRIGGER_TOKEN: Token (Pipeline triggers)

> ### ⚙️ Github CICD

Variables:

-   PAT_TOKEN: Personal access token
