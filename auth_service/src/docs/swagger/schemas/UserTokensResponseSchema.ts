export const UserTokensResponseSchema = {
    type: "object",
    properties: {
        user_uuid: {
            type: "string",
            example: "1a21605c-0cc0-44de-afcf-e2614135d48e",
        },
        access_token: {
            type: "string",
            example: "71f2dcd1-e684-4e18-853e-eb2054026815",
        },
        expires_in: {
            type: "number",
            example: 3600,
        },
        token_type: {
            type: "string",
            example: "Bearer",
        },
        refresh_token: {
            type: "string",
            example: "eae454d3-3340-45ea-9b91-43d2d1ce7919",
        },
    },
    required: [
        "user_uuid",
        "access_token",
        "expires_in",
        "token_type",
        "refresh_token",
    ],
};
