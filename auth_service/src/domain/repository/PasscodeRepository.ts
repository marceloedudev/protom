import UserPasscode from "../entity/UserPasscode";

export default interface PasscodeRepository {
    create(input: UserPasscode): Promise<void>;
    delete(user_id: number, code: string);
}
