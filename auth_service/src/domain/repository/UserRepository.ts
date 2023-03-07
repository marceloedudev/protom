import CreateUser from "../entity/CreateUser";
import User from "../entity/User";

export default interface UserRepository {
    create(input: CreateUser): Promise<User>;
}
