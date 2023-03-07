export const UserAuthorizePath = {
    post: {
        // security: [
        //     {
        //         apiKeyAuth: [],
        //     },
        // ],
        tags: ["User"],
        summary: "User Authorize",
        description: "",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/UserAuthorizeRequest",
                    },
                },
            },
        },
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/UserTokensResponse",
                        },
                    },
                },
            },
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
    get: {
        // security: [
        //     {
        //         apiKeyAuth: [],
        //     },
        // ],
        tags: ["User"],
        summary: "User Authorize Info",
        description: "",
        parameters: [
            {
                name: "code",
                in: "query",
                description: "code authenticate",
                required: true,
                type: "string",
            },
            {
                name: "user_uuid",
                in: "query",
                description: "user uuid",
                required: true,
                type: "string",
            },
        ],
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/UserAuthorizeInfoResponse",
                        },
                    },
                },
            },
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
