## Order Service Producer

This project uses [Quarkus](https://quarkus.io/), the Supersonic Subatomic Java Framework.

> ### 💻 Running the application

```shell script
docker compose up -d --build
```

**_NOTE:_** Quarkus Dev UI is available in dev mode at http://localhost:8080/q/dev/.

> ### 💻 Running tests

#### Unit tests:

```shell script
mvn -Dtest=*/unit/** test
```

#### Integration tests:

```shell script
mvn -Dtest=*/integration/** test
```

#### E2E tests:

```shell script
mvn -Dtest=*/e2e/** test
```

> ### ⚙️ Technologies

-   Quarkus
-   Mockito
-   JaCoCo
-   Flyway
-   Cucumber
-   OpenAPI (Swagger)
-   RabbitMQ
-   JUnit

> ### 🚀 Features

-   TDD / BDD
-   Unit Tests
-   Integration Tests
-   Clean Architecture / Design Patterns
-   Migrations
-   Metrics
-   Logging

> ### ⚙️ Tools

-   [Prometheus](http://localhost:9090/)
-   [Grafana](http://localhost:3000/)
-   [Jaeger](http://localhost:16686/)
-   [RabbitMQ](http://localhost:15672/)

> ### ⚙️ Gitlab CICD

Variables:

-   MY_TRIGGER_TOKEN: Token (Pipeline triggers)

> ### ⚙️ Github CICD

Variables:

-   PAT_TOKEN: Personal access token
