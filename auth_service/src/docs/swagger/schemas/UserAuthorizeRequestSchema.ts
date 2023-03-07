export const UserAuthorizeRequestSchema = {
    type: "object",
    properties: {
        code: {
            type: "string",
            example: "036250",
        },
        user_uuid: {
            type: "string",
            example: "1a21605c-0cc0-44de-afcf-e2614135d48e",
        },
    },
    required: ["code", "user_uuid"],
};
