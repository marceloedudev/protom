import User from "../entity/User";

export default interface UserDAO {
    findByEmail(email: string): Promise<User | null>;
    findByUUID(uuid: string): Promise<User | null>;
    findByEmailOrUsername(
        email: string,
        username: string
    ): Promise<User | null>;
}
