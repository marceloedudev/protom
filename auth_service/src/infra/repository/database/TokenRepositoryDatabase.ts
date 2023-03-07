import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import RedisClient from "@/domain/redis/RedisClient";
import TokenRepository from "@/domain/repository/TokenRepository";
import UserToken from "@/domain/entity/UserToken";

class TokenRepositoryDatabase implements TokenRepository {
    constructor(readonly databaseConnection: RedisClient) {}

    async create(
        key: string,
        expire_time: number,
        input: UserToken
    ): Promise<void> {
        try {
            await this.databaseConnection.set(
                key,
                JSON.stringify(input.toDataStorage()),
                {
                    EX: expire_time,
                }
            );
        } catch (error) {
            throw new DatabaseException(
                ["Error trying to create token"],
                error
            );
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.databaseConnection.del(key);
        } catch (error) {
            throw new DatabaseException(
                ["Error trying to delete token"],
                error
            );
        }
    }
}

export default TokenRepositoryDatabase;
