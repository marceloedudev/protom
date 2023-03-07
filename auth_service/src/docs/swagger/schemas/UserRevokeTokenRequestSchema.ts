export const UserRevokeTokenRequestSchema = {
    type: "object",
    properties: {
        refresh_token: {
            type: "string",
            example: "eae454d3-3340-45ea-9b91-43d2d1ce7919",
        },
    },
    required: ["refresh_token"],
};
