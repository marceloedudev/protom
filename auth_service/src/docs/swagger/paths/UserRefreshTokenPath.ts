export const UserRefreshTokenPath = {
    patch: {
        // security: [
        //     {
        //         apiKeyAuth: [],
        //     },
        // ],
        tags: ["User"],
        summary: "User Refresh Token",
        description: "",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/UserRefreshTokenRequest",
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
};
