export const NotFound = {
    description: "Not Found",
    content: {
        "application/json": {
            schema: {
                $ref: "#/schemas/Exception",
            },
        },
    },
};
