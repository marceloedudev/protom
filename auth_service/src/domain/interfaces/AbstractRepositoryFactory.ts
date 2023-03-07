import PasscodeRepository from "../repository/PasscodeRepository";
import TokenRepository from "../repository/TokenRepository";
import UserRepository from "../repository/UserRepository";

export default interface AbstractRepositoryFactory {
    createTokenRepository(): TokenRepository;
    createUserRepository(): UserRepository;
    createPasscodeRepository(): PasscodeRepository;
}
