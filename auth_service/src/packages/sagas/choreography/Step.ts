import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";
import SagaStep from "@/domain/sagas/SagaStep";

export default class Step implements SagaStep {
    #description: string;

    #invocation: MessageHandler | null;

    #compensation: MessageHandler | null;

    constructor(description: string) {
        this.#description = description;
        this.#invocation = null;
        this.#compensation = null;
    }

    setInvocation(handler: MessageHandler) {
        this.#invocation = handler;
    }

    setCompensation(handler: MessageHandler) {
        this.#compensation = handler;
    }

    getDescription(): string {
        return this.#description;
    }

    getInvocation(): MessageHandler | null {
        return this.#invocation;
    }

    getCompensation(): MessageHandler | null {
        return this.#compensation;
    }
}
