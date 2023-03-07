import UserToken from "../entity/UserToken";

export default interface TokenDAO {
    get(key: string): Promise<UserToken | null>;
}
