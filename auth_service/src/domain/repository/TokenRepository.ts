import UserToken from "../entity/UserToken";

export default interface WriterTokenRepository {
    create(key: string, expire_time: number, input: UserToken): Promise<void>;
    delete(key: string): Promise<void>;
}
