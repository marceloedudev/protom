export const InternalServer = {
    description: "Internal Server Error",
    content: {
        "application/json": {
            schema: {
                $ref: "#/schemas/Exception",
            },
        },
    },
};
