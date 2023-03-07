import BadRequestException from "../errors/exceptions/BadRequestException";

export default class TokenStorage {
    getAccessTokenKeyStorage(hash: string) {
        if (!hash || hash === "") {
            throw new BadRequestException(["Hash access token is required"]);
        }
        return `access:user:${hash}`;
    }

    getRefreshTokenKeyStorage(hash: string) {
        if (!hash || hash === "") {
            throw new BadRequestException(["Hash refresh token is required"]);
        }
        return `refresh:user:${hash}`;
    }
}
