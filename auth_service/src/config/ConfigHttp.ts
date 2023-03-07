class ConfigHttp {
    path() {
        return `/auth/v1`;
    }

    port() {
        return Number(process.env.HTTP_SERVER_PORT);
    }
}

export default ConfigHttp;
