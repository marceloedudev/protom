import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PasscodeRepositoryMemory from "../memory/PasscodeRepositoryMemory";
import TokenRepositoryMemory from "../memory/TokenRepositoryMemory";
import UserRepositoryMemory from "../memory/UserRepositoryMemory";
import AbstractRepositoryFactory from "@/domain/interfaces/AbstractRepositoryFactory";

class MemoryRepositoryFactory implements AbstractRepositoryFactory {
    #repository: DatabaseRepositoryFactory;

    constructor({ repository }) {
        this.#repository = repository;
    }

    createTokenRepository() {
        return new TokenRepositoryMemory(
            this.#repository.createTokenRepository()
        );
    }

    createUserRepository() {
        return new UserRepositoryMemory(
            this.#repository.createUserRepository()
        );
    }

    createPasscodeRepository() {
        return new PasscodeRepositoryMemory(
            this.#repository.createPasscodeRepository()
        );
    }
}

export default MemoryRepositoryFactory;
