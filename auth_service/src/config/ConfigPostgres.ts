class ConfigPostgres {
    host() {
        return process.env.POSTGRES_HOSTNAME;
    }

    port() {
        return Number(process.env.POSTGRES_PORT);
    }

    username() {
        return process.env.POSTGRES_USERNAME;
    }

    password() {
        return process.env.POSTGRES_PASSWORD;
    }

    database() {
        return process.env.POSTGRES_DBNAME;
    }
}

export default ConfigPostgres;
