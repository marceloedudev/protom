export const Unauthorized = {
    description: "Invalid Token",
    content: {
        "application/json": {
            schema: {
                $ref: "#/schemas/Exception",
            },
        },
    },
};
