import RedisClient from "@/domain/redis/RedisClient";
import TokenDAO from "@/domain/dao/TokenDAO";
import UserToken from "@/domain/entity/UserToken";

class TokenDAODatabase implements TokenDAO {
    constructor(private readonly databaseConnection: RedisClient) {}

    async get(key: string): Promise<UserToken | null> {
        const token = await this.databaseConnection.get(key);
        if (!token) {
            return null;
        }
        try {
            const data = JSON.parse(token);
            const userToken = new UserToken(data);
            userToken.setAccessToken(data.access_token);
            userToken.setRefreshToken(data.refresh_token);
            userToken.setTokenCreatedAt(data.token_created_at);
            return userToken;
        } catch (error) {
            return null;
        }
    }
}

export default TokenDAODatabase;
