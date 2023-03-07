import ConfigFactory from "@/config/ConfigFactory";
import PasscodeAdapter from "@/domain/passcode/PasscodeAdapter";
import speakeasy from "speakeasy";

class PasscodeAdapterImpl implements PasscodeAdapter {
    #secret: string;

    constructor(private readonly configFactory: ConfigFactory) {
        this.#secret = configFactory.createConfigToken().getSecretPasscode();
    }

    generate(): string {
        const token = speakeasy.totp({
            secret: this.#secret,
            encoding: "base32",
        });
        return token;
    }

    verify(token: string): boolean {
        const verified = speakeasy.totp.verify({
            secret: this.#secret,
            encoding: "base32",
            token,
        });
        return verified;
    }
}
export default PasscodeAdapterImpl;
