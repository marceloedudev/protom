import BcryptAdapter from "@/domain/bcryptjs/BcryptAdapter";
import BcryptAdapterImpl from "@/packages/bcryptjs/BcryptAdapterImpl";
import FakerAdapter from "../../../../../lib/faker/FakerAdapter";
import UUIDAdapter from "@/domain/uuid/UUIDAdapter";
import UUIDAdapterImpl from "@/packages/uuid/UUIDAdapterImpl";
import { UserModelPostgres } from "@/models/typeorm/UserModelPostgres";
import { setSeederFactory } from "typeorm-extension";

const bcriptjs: BcryptAdapter = new BcryptAdapterImpl();
const uuidAdapter: UUIDAdapter = new UUIDAdapterImpl();
const fakerAdapter = new FakerAdapter();

export default setSeederFactory(UserModelPostgres, async () => {
    const password = "123456@ASDw";
    const passwordHash = await bcriptjs.hash(password);
    const user = new UserModelPostgres();
    user.username = fakerAdapter.internet().userName();
    user.email = fakerAdapter.internet().email();
    user.fullname = fakerAdapter.name().fullName();
    user.password_hash = passwordHash;
    user.email_verified = fakerAdapter.datatype().boolean();
    user.active = fakerAdapter.datatype().boolean();
    user.uuid = uuidAdapter.getUUID();
    return user;
});
