import UUIDAdapter from "@/domain/uuid/UUIDAdapter";
import { randomUUID as uuid } from "node:crypto";

class UUIDAdapterImpl implements UUIDAdapter {
    getUUID(): string {
        return uuid();
    }
}

export default UUIDAdapterImpl;
