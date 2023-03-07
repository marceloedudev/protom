export const ExceptionSchema = {
    type: "object",
    properties: {
        messages: {
            type: "array",
            items: {
                type: "string",
            },
        },
        status: {
            type: "number",
        },
        error: {
            type: "string",
        },
        timestamp: {
            type: "string",
            format: "date-time",
            required: true,
        },
        path: {
            type: "string",
        },
    },
    required: ["messages", "status", "error", "timestamp", "path"],
};
