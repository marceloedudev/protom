import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";

export default interface SagaStep {
    setInvocation(handler: MessageHandler): void;
    setCompensation(handler: MessageHandler): void;
    getDescription(): string;
    getInvocation(): MessageHandler | null;
    getCompensation(): MessageHandler | null;
}
