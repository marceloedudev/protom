import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import DateAdapter from "@/domain/date/DateAdapter";
import DateAdapterImpl from "@/packages/date/DateAdapterImpl";

const dateAdapter: DateAdapter = new DateAdapterImpl();

@Entity({ name: "user" })
export class UserModelPostgres {
    @Index()
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Column({ name: "username", type: "varchar", length: 100 })
    username!: string;

    @Column({ name: "email", type: "varchar", length: 100 })
    email!: string;

    @Column({ name: "fullname", type: "varchar", length: 300 })
    fullname!: string;

    @Column({ name: "password_hash", type: "varchar", length: 300 })
    password_hash!: string;

    @Column({
        name: "email_verified",
        type: "boolean",
        default: false,
        nullable: false,
    })
    email_verified = false;

    @Column({ name: "active", type: "boolean", default: true, nullable: false })
    active = true;

    @Column({ name: "uuid", unique: true })
    uuid!: string;

    @CreateDateColumn({
        name: "created_at",
        // type: "timestamp",
        // nullable: false,
    })
    created_at!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        // type: "timestamp",
        // nullable: false,
    })
    updated_at!: Date;

    @BeforeInsert()
    public beforeInsert() {
        this.created_at = dateAdapter.now();
        this.updated_at = dateAdapter.now();
    }

    @BeforeUpdate()
    public beforeUpdate() {
        this.updated_at = dateAdapter.now();
    }
}
