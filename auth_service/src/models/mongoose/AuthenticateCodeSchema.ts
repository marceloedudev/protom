import { Document, Schema, model } from "mongoose";

export interface IAuthenticateCodeSchema extends Document {
    user_id: number;
    code: string;
    ip_address: string;
    expire_at: Date;
}

const schema: Schema = new Schema(
    {
        user_id: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        ip_address: {
            type: String,
            required: true,
            unique: true,
        },
        expire_at: {
            type: Date,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const AuthenticateCodeSchema = model<IAuthenticateCodeSchema>(
    "AuthenticateCode",
    schema,
    "AuthenticateCode"
);

export default AuthenticateCodeSchema;
