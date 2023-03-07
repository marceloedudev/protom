export const UserAuthenticateRequestSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            example: "user@gmail.com",
        },
        password: {
            type: "string",
            example: "123456@ASDw",
        },
    },
    required: ["email", "password"],
};
