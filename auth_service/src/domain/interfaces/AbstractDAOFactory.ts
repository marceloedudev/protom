import PasscodeDAO from "../dao/PasscodeDAO";
import ReaderTokenDAO from "../dao/TokenDAO";
import ReaderUserDAO from "../dao/UserDAO";

export default interface AbstractDAOFactory {
    createUserDAO(): ReaderUserDAO;
    createTokenDAO(): ReaderTokenDAO;
    createPasscodeDAO(): PasscodeDAO;
}
