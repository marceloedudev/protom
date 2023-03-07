export const UserAuthTokenRequestSchema = {
    type: "object",
    properties: {
        client_id: {
            type: "string",
            example: "order_service",
        },
        client_secret: {
            type: "string",
            example: "ccab14c1-bc12-401d-97f0-63272ab9f663",
        },
        access_token: {
            type: "string",
            example: "71f2dcd1-e684-4e18-853e-eb2054026815",
        },
    },
    required: ["client_id", "client_secret", "access_token"],
};
