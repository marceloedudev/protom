## Stock Service Consumer

This project uses [Spring Boot](https://spring.io/)

> ### 💻 Running the application

```shell script
docker compose up -d --build
```

> ### 💻 Running tests

#### Unit tests:

```shell script
mvn -Dtest=*/unit/** test
```

#### Integration tests:

```shell script
mvn -Dtest=*/integration/** test
```

#### e2e tests:

```shell script
mvn -Dtest=*/e2e/** test
```

> ### Jacoco

```shell script
mvn clean verify
```

Jacoco reports in target/site/jacoco/index.html
