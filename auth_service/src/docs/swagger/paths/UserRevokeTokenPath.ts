export const UserRevokeTokenPath = {
    delete: {
        // security: [
        //     {
        //         apiKeyAuth: [],
        //     },
        // ],
        tags: ["User"],
        summary: "User revoke token",
        description: "",
        parameters: [
            {
                name: "user_uuid",
                in: "path",
                description: "user uuid",
                required: true,
                type: "string",
            },
            {
                name: "refresh_token",
                in: "path",
                description: "refresh token",
                required: true,
                type: "string",
            },
        ],
        responses: {
            400: {
                $ref: "#/components/BadRequest",
            },
            401: {
                $ref: "#/components/Unauthorized",
            },
            404: {
                $ref: "#/components/NotFound",
            },
            409: {
                $ref: "#/components/Conflict",
            },
            500: {
                $ref: "#/components/InternalServer",
            },
        },
    },
};
