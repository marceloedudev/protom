export const BadRequest = {
    description: "Bad Request",
    content: {
        "application/json": {
            schema: {
                $ref: "#/schemas/Exception",
            },
        },
    },
};
