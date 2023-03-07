import UserSchema, { IUserSchema } from "@/models/mongoose/UserSchema";

import MongoClient from "@/domain/mongo/MongoClient";
import ReaderUserDAO from "@/domain/dao/UserDAO";
import User from "@/domain/entity/User";
import UserMapper from "@/domain/mappers/UserMapper";

class UserDAODatabase implements ReaderUserDAO {
    constructor(private readonly mongoClient: MongoClient) {
        mongoClient.setEntity(UserSchema);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.mongoClient.findOne<IUserSchema>({
            email,
        });
        if (!userData) {
            return null;
        }
        return UserMapper.databaseToUser(userData);
    }

    async findByUUID(uuid: string): Promise<User | null> {
        const userData = await this.mongoClient.findOne<IUserSchema>({
            uuid,
        });
        if (!userData) {
            return null;
        }
        return UserMapper.databaseToUser(userData);
    }

    async findByEmailOrUsername(
        email: string,
        username: string
    ): Promise<User | null> {
        const userData = await this.mongoClient.findOne<IUserSchema>({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });
        if (!userData) {
            return null;
        }
        return UserMapper.databaseToUser(userData);
    }
}

export default UserDAODatabase;
