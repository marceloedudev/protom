export const UserPath = {
    post: {
        // security: [
        //     {
        //         apiKeyAuth: [],
        //     },
        // ],
        tags: ["User"],
        summary: "Create user",
        description: "",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/CreateUserRequest",
                    },
                },
            },
        },
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
