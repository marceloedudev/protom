import { Document, Schema, model } from "mongoose";

export interface IUserSchema extends Document {
    user_id: number;
    username: string;
    email: string;
    fullname: string;
    password_hash: string;
    email_verified: boolean;
    active: boolean;
    uuid: string;
    created_at: Date;
    updated_at: Date;
}

const schema: Schema = new Schema(
    {
        user_id: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
        email_verified: {
            type: Boolean,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        uuid: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: { createdAt: false, updatedAt: false },
    }
);

const UserSchema = model<IUserSchema>("User", schema, "User");

export default UserSchema;
