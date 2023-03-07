import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import CommandFactory from "../factory/CommandFactory";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import NotFoundException from "@/domain/errors/exceptions/NotFoundException";
import SendEmailInput from "../dto/SendEmailInput";
import { Usecase } from "@/domain/interfaces/Usecase";
import UserAuthenticate from "@/domain/entity/UserAuthenticate";
import UserAuthenticateInput from "../dto/UserAuthenticateInput";
import UserAuthenticateOutput from "../dto/UserAuthenticateOutput";
import UserPasscode from "@/domain/entity/UserPasscode";

class UserAuthenticateUsecase
    implements Usecase<UserAuthenticateInput, UserAuthenticateOutput>
{
    #commandFactory: CommandFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#commandFactory = mainInjector.getCommandFactory();
    }

    async execute(input: UserAuthenticateInput) {
        const userAuthenticate = new UserAuthenticate({
            email: input.getEmail(),
            password: input.getPassword(),
            ip_address: input.getIPAddress(),
            useragent: input.getUseragent(),
        });
        if (userAuthenticate.validate()) {
            throw new BadRequestException(userAuthenticate.getNotifications());
        }
        const user = await this.mainInjector
            .createDAO()
            .createUserDAO()
            .findByEmail(userAuthenticate.getEmail());
        if (!user) {
            throw new NotFoundException(["Email/password not found"]);
        }
        if (!(await userAuthenticate.checkPassword(user.getPasswordHash()))) {
            throw new BadRequestException(["Email/password not found"]);
        }
        const code = this.mainInjector.getPasscodeAdapter().generate();
        const passcodeRepository = this.mainInjector
            .createRepository()
            .createPasscodeRepository();
        const seconds = this.mainInjector
            .getConfigFactory()
            .createConfigToken()
            .getAuthenticateExpireTime();
        await passcodeRepository.create(
            new UserPasscode({
                user_uuid: user.getUserUUID(),
                ip_address: userAuthenticate.getIPAddress(),
                useragent: userAuthenticate.getUseragent(),
                user_id: user.getUserId(),
                code,
                expire_time: seconds,
            })
        );
        await this.#commandFactory.sendEmail().execute(
            new SendEmailInput({
                email: user.getEmail(),
                fullname: user.getFullname(),
                content: `CODE: ${code}`,
            })
        );
        return new UserAuthenticateOutput({
            code,
            user_uuid: user.getUserUUID(),
        });
    }
}

export default UserAuthenticateUsecase;
