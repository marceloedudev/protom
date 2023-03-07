import User from "../entity/User";

export default class UserMapper {
    public static databaseToUser(userData): User {
        const {
            user_id,
            username,
            email: userEmail,
            fullname,
            password_hash,
            uuid: user_uuid,
        } = userData;
        const user = new User({
            user_id,
            username,
            email: userEmail,
            fullname,
            password_hash,
            user_uuid,
        });
        return user;
    }
}
