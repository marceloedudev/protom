import BcryptAdapter from "@/domain/bcryptjs/BcryptAdapter";
import bcrypt from "bcryptjs";

class BcryptAdapterImpl implements BcryptAdapter {
    async hash(password: string, salt = 12): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async compare(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}

export default BcryptAdapterImpl;
