import getComponents from "./components";
import getPaths from "./paths";
import getSchemas from "./schemas";

const SwaggerConfig = () => {
    return {
        openapi: "3.0.0",
        info: {
            title: "auth_service",
            description: "N/A",
            version: "1.0.0",
        },
        servers: [
            {
                url: "/auth/v1",
                description: "Auth v1",
            },
        ],
        tags: [
            {
                name: "User",
                description: "",
            },
        ],
        paths: getPaths(),
        schemas: getSchemas(),
        components: getComponents(),
    };
};

export default SwaggerConfig;
