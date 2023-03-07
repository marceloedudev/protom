export const CreateUserRequestSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            example: "username",
        },
        email: {
            type: "string",
            example: "email@gmail.com",
        },
        fullname: {
            type: "string",
            example: "Full name",
        },
        password: {
            type: "string",
            example: "123456WAsd",
        },
    },
    required: ["username", "email", "fullname", "password"],
};
