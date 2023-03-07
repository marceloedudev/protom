/* eslint-disable @typescript-eslint/no-unused-vars */
import UserSchema from "@/models/mongoose/UserSchema";
import UserSchemaFactory from "../factories/UserSchemaFactory";

export default class UserSeederMongoDB {
    async run() {
        const users: any = [];
        for await (const num of Array.from(Array(10).keys())) {
            const user = await UserSchemaFactory();
            users.push(user);
        }
        // await UserSchema.create(user);
        await UserSchema.insertMany(await Promise.all(users));
    }
}
