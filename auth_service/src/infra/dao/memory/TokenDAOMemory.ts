import TokenDAO from "@/domain/dao/TokenDAO";
import UserToken from "@/domain/entity/UserToken";

class TokenDAOMemory implements TokenDAO {
    constructor(private readonly dao: TokenDAO) {}

    async get(key: string): Promise<UserToken | null> {
        return this.dao.get(key);
    }
}

export default TokenDAOMemory;
