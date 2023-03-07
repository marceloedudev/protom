import BcryptAdapter from "@/domain/bcryptjs/BcryptAdapter";
import BcryptAdapterImpl from "@/packages/bcryptjs/BcryptAdapterImpl";
import FakerAdapter from "../../../../../lib/faker/FakerAdapter";
import { IUserSchema } from "@/models/mongoose/UserSchema";
import UUIDAdapter from "@/domain/uuid/UUIDAdapter";
import UUIDAdapterImpl from "@/packages/uuid/UUIDAdapterImpl";

const bcriptjs: BcryptAdapter = new BcryptAdapterImpl();
const uuidAdapter: UUIDAdapter = new UUIDAdapterImpl();
const fakerAdapter = new FakerAdapter();

const UserSchemaFactory = async () => {
    const password = "123456@ASDw";
    const passwordHash = await bcriptjs.hash(password);
    return {
        user_id: fakerAdapter.datatype().number(),
        username: fakerAdapter.internet().userName(),
        email: fakerAdapter.internet().email(),
        fullname: fakerAdapter.name().fullName(),
        password_hash: passwordHash,
        email_verified: fakerAdapter.datatype().boolean(),
        active: fakerAdapter.datatype().boolean(),
        uuid: uuidAdapter.getUUID(),
        created_at: new Date(),
        updated_at: new Date(),
    } as IUserSchema;
};

export default UserSchemaFactory;
