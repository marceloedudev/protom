/* eslint-disable no-underscore-dangle */
import UserSchema, { IUserSchema } from "@/models/mongoose/UserSchema";

import CreateUser from "@/domain/entity/CreateUser";
import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import MongoClient from "@/domain/mongo/MongoClient";
import PostgresClient from "@/domain/postgres/PostgresClient";
import User from "@/domain/entity/User";
import { UserModelPostgres } from "@/models/typeorm/UserModelPostgres";
import UserRepository from "@/domain/repository/UserRepository";

class UserRepositoryDatabase implements UserRepository {
    constructor(
        private readonly postgresClient: PostgresClient,
        private readonly mongoClient: MongoClient
    ) {
        postgresClient.setEntity(UserModelPostgres);
        mongoClient.setEntity(UserSchema);
    }

    async create(input: CreateUser) {
        let userPostgres: UserModelPostgres | null = null;
        let userMongodb: IUserSchema | null = null;
        try {
            userPostgres = await this.postgresClient.save<UserModelPostgres>({
                username: input.getUsername(),
                email: input.getEmail(),
                fullname: input.getFullname(),
                password_hash: await input.getPasswordHash(),
                email_verified: input.getEmailVerified(),
                active: input.getActive(),
                uuid: input.getUserUUID(),
            });
            userMongodb = await this.mongoClient.create<IUserSchema>({
                user_id: userPostgres.id,
                username: userPostgres.username,
                email: userPostgres.email,
                fullname: userPostgres.fullname,
                password_hash: userPostgres.password_hash,
                email_verified: userPostgres.email_verified,
                active: userPostgres.active,
                uuid: userPostgres.uuid,
                created_at: userPostgres.created_at,
                updated_at: userPostgres.updated_at,
            });
            const user = new User({
                user_id: userPostgres.id,
                username: userPostgres.username,
                email: userPostgres.email,
                fullname: userPostgres.fullname,
                password_hash: userPostgres.password_hash,
                user_uuid: userPostgres.uuid,
            });
            return user;
        } catch (error: any) {
            console.log({ error });
            if (userPostgres && userPostgres.id) {
                await this.postgresClient.delete({
                    id: userPostgres.id,
                });
            }
            if (userMongodb && userMongodb._id) {
                await this.mongoClient.remove({
                    _id: userMongodb._id,
                });
            }
            throw new DatabaseException(["Error trying to create user"], error);
        }
    }
}

export default UserRepositoryDatabase;
