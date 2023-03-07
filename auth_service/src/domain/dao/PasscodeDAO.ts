import UserPasscode from "../entity/UserPasscode";

export default interface PasscodeDAO {
    get(user_id: number, code: string): Promise<UserPasscode | null>;
}
