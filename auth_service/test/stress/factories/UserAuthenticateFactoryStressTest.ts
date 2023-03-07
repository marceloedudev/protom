import FactoryStressTest from "../core/FactoryStressTest";

export default class UserAuthenticateFactoryStressTest
    implements FactoryStressTest
{
    create(): object {
        const body = {
            email: "user@gmail.com",
            password: "123456@wASD88",
        };

        return {
            method: "POST",
            path: "/auth/v1/user/authenticate",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
    }
}
