import PasscodeDAO from "@/domain/dao/PasscodeDAO";
import UserPasscode from "@/domain/entity/UserPasscode";

class PasscodeDAOMemory implements PasscodeDAO {
    constructor(private readonly dao: PasscodeDAO) {}

    async get(user_id: number, code: string): Promise<UserPasscode | null> {
        return this.dao.get(user_id, code);
    }
}

export default PasscodeDAOMemory;
