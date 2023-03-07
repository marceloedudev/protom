## Auth Service

> ### 💻 Running the application

```shell script
docker compose up -d --build
```

> ### ⚙️ Technologies

-   Node.js
-   OpenAPI (Swagger)
-   RabbitMQ
-   Eslint
-   TypeORM
-   Mongoose

> ### 💻 Commands:

```shell script
docker compose exec auth_service sh
```

-   Create Migrations:

```shell script
npm run typeorm:create-migration:dev --name=CreateUserTable
```

-   Run Migrations:

```shell script
npm run typeorm:run-migration:dev
```

-   Run Seeders (Postgres):

```shell script
npm run seed:postgres:run:dev
```

-   Run Seeders (MongoDB):

```shell script
npm run seed:mongodb:run:dev
```

> ### 💻 Running tests

#### Unit tests:

```shell script
npm run test:unit
```

#### Integration tests:

```shell script
npm run test:integration
```

#### E2E tests:

```shell script
npm run test:e2e
```

> ### ⚙️ Databases:

-   Postgresql
-   Mongodb
-   Redis

> ### ⚙️ List all routes:

URL:
http://localhost:4000/q/routes/

> ### ⚙️ Swagger:

URL:
http://localhost:4000/swagger/

> ### ⚙️ Gitlab CICD

Variables:

-   MY_TRIGGER_TOKEN: Token (Pipeline triggers)

> ### ⚙️ Github CICD

Variables:

-   PAT_TOKEN: Personal access token
