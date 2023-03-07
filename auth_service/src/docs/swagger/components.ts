import { ApiKeyAuthSchema } from "./schemas/ApiKeyAuthSchema";
import { BadRequest } from "./components/BadRequest";
import { Conflict } from "./components/Conflict";
import { InternalServer } from "./components/InternalServer";
import { NotFound } from "./components/NotFound";
import { Unauthorized } from "./components/Unauthorized";

const getComponents = () => {
    return {
        BadRequest,
        InternalServer,
        Unauthorized,
        NotFound,
        Conflict,
        securitySchemes: {
            apiKeyAuth: ApiKeyAuthSchema,
        },
    };
};

export default getComponents;
