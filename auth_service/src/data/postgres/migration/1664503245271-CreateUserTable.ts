import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1664503245271 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE public.user (
            id SERIAL NOT NULL,
            username varchar(100) UNIQUE NOT NULL,
            email varchar(100) NOT NULL,
            fullname varchar(50) NOT NULL,
            password_hash varchar(300) not null,
            email_verified boolean not null,
            active boolean not null,
            uuid varchar(255) not null,
            created_at timestamp,
            updated_at timestamp,
            PRIMARY KEY (id)
          );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
