import PasscodeRepository from "@/domain/repository/PasscodeRepository";
import UserPasscode from "@/domain/entity/UserPasscode";

class PasscodeRepositoryMemory implements PasscodeRepository {
    constructor(private readonly repository: PasscodeRepository) {}

    async create(input: UserPasscode): Promise<void> {
        return this.repository.create(input);
    }

    async delete(user_id: number, code: string) {
        await this.repository.delete(user_id, code);
    }
}

export default PasscodeRepositoryMemory;
