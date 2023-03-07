import UserToken from "@/domain/entity/UserToken";
import WriterTokenRepository from "@/domain/repository/TokenRepository";

class TokenRepositoryMemory implements WriterTokenRepository {
    constructor(private readonly repository) {}

    async create(
        key: string,
        expire_time: number,
        input: UserToken
    ): Promise<void> {
        await this.repository.create(key, expire_time, input);
    }

    async delete(key: string): Promise<void> {
        await this.repository.delete(key);
    }
}

export default TokenRepositoryMemory;
