export const UserAuthTokenResponseSchema = {
    type: "object",
    properties: {
        user_id: {
            type: "number",
            example: 1,
        },
        username: {
            type: "username",
            example: "username",
        },
        email: {
            type: "string",
            example: "user@gmail.com",
        },
        fullname: {
            type: "string",
            example: "Full name",
        },
        user_uuid: {
            type: "string",
            example: "63386a928da808cbae07d16e",
        },
    },
    required: ["user_id", "username", "email", "fullname", "user_uuid"],
};
