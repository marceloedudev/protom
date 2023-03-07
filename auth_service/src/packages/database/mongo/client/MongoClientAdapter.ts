import DatabaseException from "@/domain/errors/exceptions/DatabaseException";
import MongoClient from "@/domain/mongo/MongoClient";
import mongoose from "mongoose";

export default class MongoClientAdapter implements MongoClient {
    private entity!: mongoose.Model<any>;

    constructor(private readonly connection) {}

    setEntity(entity: any): void {
        this.entity = entity;
    }

    async create<ISchema>(document): Promise<ISchema> {
        try {
            return this.entity.create(document);
        } catch (error) {
            throw new DatabaseException(["Mongo error 'create'"], error);
        }
    }

    async remove(document): Promise<void> {
        try {
            return this.entity.remove(document);
        } catch (error) {
            throw new DatabaseException(["Mongo error 'remove'"], error);
        }
    }

    async findOne<ISchema>(document): Promise<ISchema | null> {
        try {
            const entity = await this.entity.findOne(document);
            if (!entity) {
                return null;
            }
            return entity;
        } catch (error) {
            throw new DatabaseException(["Mongo error 'findOne'"], error);
        }
    }
}
