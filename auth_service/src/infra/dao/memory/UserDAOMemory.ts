import User from "@/domain/entity/User";
import UserDAO from "@/domain/dao/UserDAO";

class UserDAOMemory implements UserDAO {
    constructor(private readonly dao: UserDAO) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.dao.findByEmail(email);
    }

    async findByUUID(uuid: string): Promise<User | null> {
        return this.dao.findByUUID(uuid);
    }

    async findByEmailOrUsername(
        email: string,
        username: string
    ): Promise<User | null> {
        return this.dao.findByEmailOrUsername(email, username);
    }
}

export default UserDAOMemory;
