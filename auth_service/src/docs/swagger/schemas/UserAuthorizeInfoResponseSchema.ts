export const UserAuthorizeInfoResponseSchema = {
    type: "object",
    properties: {
        user_uuid: {
            type: "string",
            example: "1a21605c-0cc0-44de-afcf-e2614135d48e",
        },
        ip_address: {
            type: "string",
            example: "::ffff:192.168.0.1",
        },
        useragent: {
            type: "number",
            example: "insomnia/2022.6.0",
        },
    },
    required: ["user_uuid", "ip_address", "useragent"],
};
