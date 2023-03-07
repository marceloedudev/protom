import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import PasscodeDAO from "@/domain/dao/PasscodeDAO";
import { Query } from "@/domain/interfaces/Query";
import UserAuthorizeInfo from "@/domain/entity/UserAuthorizeInfo";
import UserAuthorizeInfoInput from "../dto/UserAuthorizeInfoInput";
import UserAuthorizeInfoOutput from "../dto/UserAuthorizeInfoOutput";

class UserAuthorizeInfoQuery
    implements Query<UserAuthorizeInfoInput, UserAuthorizeInfoOutput>
{
    #passcodeDAO: PasscodeDAO;

    constructor(private readonly mainInjector: MainInjector) {
        this.#passcodeDAO = this.mainInjector.createDAO().createPasscodeDAO();
    }

    async execute(input: UserAuthorizeInfoInput) {
        const userAuthorizeInfo = new UserAuthorizeInfo({
            code: input.getCode(),
            user_uuid: input.getUserUUID(),
        });
        if (userAuthorizeInfo.validate()) {
            throw new BadRequestException(userAuthorizeInfo.getNotifications());
        }
        const user = await this.mainInjector
            .createDAO()
            .createUserDAO()
            .findByUUID(userAuthorizeInfo.getUserUUID());
        if (!user) {
            throw new NotFoundException(["User not found"]);
        }
        const info = await this.#passcodeDAO.get(
            user.getUserId(),
            userAuthorizeInfo.getCode()
        );
        if (!info) {
            throw new NotFoundException(["Invalid token"]);
        }
        return new UserAuthorizeInfoOutput({
            user_uuid: info.getUserUUID(),
            ip_address: info.getIPAddress(),
            useragent: info.getUseragent(),
            user_id: info.getUserId(),
            code: info.getCode(),
        });
    }
}

export default UserAuthorizeInfoQuery;
