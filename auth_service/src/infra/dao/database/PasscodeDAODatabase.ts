import PasscodeDAO from "@/domain/dao/PasscodeDAO";
import RedisClient from "@/domain/redis/RedisClient";
import UserPasscode from "@/domain/entity/UserPasscode";

class PasscodeDAODatabase implements PasscodeDAO {
    constructor(private readonly databaseConnection: RedisClient) {}

    async get(user_id: number, code: string): Promise<UserPasscode | null> {
        const passcode = await this.databaseConnection.get(
            `user_authorize:${user_id}:${code}`
        );
        if (!passcode) {
            return null;
        }
        try {
            const data = JSON.parse(passcode);
            return new UserPasscode({
                user_uuid: data.user_uuid,
                ip_address: data.ip_address,
                useragent: data.useragent,
                user_id: data.user_id,
                code: data.code,
                expire_time: data.expire_time,
            });
        } catch (error) {
            return null;
        }
    }
}

export default PasscodeDAODatabase;
