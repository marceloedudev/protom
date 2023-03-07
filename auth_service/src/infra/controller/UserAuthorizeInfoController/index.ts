import HttpInput from "@/domain/http/HttpInput";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import QueryFactory from "@/application/factory/QueryFactory";
import UserAuthorizeInfoInput from "@/application/dto/UserAuthorizeInfoInput";
import UserAuthorizeInfoRequest from "@/infra/dto/UserAuthorizeInfoRequest";
import UserAuthorizeInfoResponse from "@/infra/dto/UserAuthorizeInfoResponse";

class UserAuthorizeInfoController {
    #queryFactory: QueryFactory;

    constructor(private readonly mainInjector: MainInjector) {
        this.#queryFactory = mainInjector.getQueryFactory();
    }

    async execute({ query }: HttpInput) {
        const input = new UserAuthorizeInfoRequest({
            code: query.code,
            user_uuid: query.user_uuid,
        });
        const data = await this.#queryFactory.createUserAuthorizeInfo().execute(
            new UserAuthorizeInfoInput({
                code: input.getCode(),
                user_uuid: input.getUserUUID(),
            })
        );
        const output = new UserAuthorizeInfoResponse({
            user_uuid: data.getUserUUID(),
            ip_address: data.getIPAddress(),
            useragent: data.getUseragent(),
            code: data.getCode(),
        });
        return output.toJSON();
    }
}

export default UserAuthorizeInfoController;
