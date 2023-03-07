import CreateUser from "@/domain/entity/CreateUser";
import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";

class UserRepositoryMemory implements UserRepository {
    constructor(private readonly repository: UserRepository) {}

    create(input: CreateUser): Promise<User> {
        return this.repository.create(input);
    }
}

export default UserRepositoryMemory;
