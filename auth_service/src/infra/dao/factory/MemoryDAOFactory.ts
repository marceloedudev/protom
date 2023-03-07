import AbstractDAOFactory from "@/domain/interfaces/AbstractDAOFactory";
import DatabaseDAOFactory from "./DatabaseDAOFactory";
import PasscodeDAOMemory from "../memory/PasscodeDAOMemory";
import TokenDAOMemory from "../memory/TokenDAOMemory";
import UserDAOMemory from "../memory/UserDAOMemory";

class MemoryDAOFactory implements AbstractDAOFactory {
    #dao: DatabaseDAOFactory;

    constructor({ dao }) {
        this.#dao = dao;
    }

    createUserDAO() {
        return new UserDAOMemory(this.#dao.createUserDAO());
    }

    createTokenDAO() {
        return new TokenDAOMemory(this.#dao.createTokenDAO());
    }

    createPasscodeDAO() {
        return new PasscodeDAOMemory(this.#dao.createPasscodeDAO());
    }
}

export default MemoryDAOFactory;
