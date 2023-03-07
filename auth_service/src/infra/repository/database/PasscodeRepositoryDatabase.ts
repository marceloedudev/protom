import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import PasscodeRepository from "@/domain/repository/PasscodeRepository";
import RedisClient from "@/domain/redis/RedisClient";
import UserPasscode from "@/domain/entity/UserPasscode";

class PasscodeRepositoryDatabase implements PasscodeRepository {
    constructor(readonly databaseConnection: RedisClient) {}

    async create(input: UserPasscode): Promise<void> {
        try {
            await this.databaseConnection.set(
                `user_authorize:${input.getUserId()}:${input.getCode()}`,
                JSON.stringify(input.toDataStorage()),
                {
                    EX: input.getExpireTime(),
                }
            );
        } catch (error) {
            throw new DatabaseException(
                ["Error trying to create passcode"],
                error
            );
        }
    }

    async delete(user_id: number, code: string) {
        try {
            await this.databaseConnection.del(
                `user_authorize:${user_id}:${code}`
            );
        } catch (error) {
            throw new DatabaseException(
                ["Error trying to delete passcode"],
                error
            );
        }
    }
}

export default PasscodeRepositoryDatabase;
