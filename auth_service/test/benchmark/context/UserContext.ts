/* eslint-disable security-node/detect-crlf */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import BadRequestException from "@/domain/errors/exceptions/BadRequestException";
import CreateUser from "@/domain/entity/CreateUser";
import FakerAdapter from "../../../lib/faker/FakerAdapter";

const faker = new FakerAdapter();

export default ({ suite }) => {
    suite.add("CreateUserEntityValidate", () => {
        let user!: CreateUser;
        try {
            user = new CreateUser({
                username: faker.internet().userName(),
                email: faker.internet().email(),
                fullname: faker.name().fullName(),
                password: faker.internet().password(),
            });
            if (user.validate()) {
                throw new BadRequestException(user.getNotifications());
            }
        } catch (error) {
            console.log({
                error,
                user: {
                    username: user.getUsername(),
                    email: user.getEmail(),
                    fullname: user.getFullname(),
                    password: user.getPassword(),
                },
            });
            process.exit(1);
        }
    });
};
