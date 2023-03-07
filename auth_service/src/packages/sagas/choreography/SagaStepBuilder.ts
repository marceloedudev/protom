import MessageHandler from "@/packages/eventBus/abstractions/MessageHandler";
import SagaStep from "@/domain/sagas/SagaStep";
import Step from "./Step";

export default class SagaStepBuilder {
    #currentStep: SagaStep | null;

    #steps: Array<SagaStep> = [];

    constructor() {
        this.#currentStep = null;
    }

    static with() {
        return new SagaStepBuilder();
    }

    step(description: string) {
        this.#currentStep = new Step(description);
        this.#steps.push(this.#currentStep);
        return this;
    }

    invoke(handler: MessageHandler) {
        if (this.#currentStep) {
            this.#currentStep.setInvocation(handler);
        }
        return this;
    }

    withCompensation(handler: MessageHandler) {
        if (this.#currentStep) {
            this.#currentStep.setCompensation(handler);
        }
        return this;
    }

    build(): Array<SagaStep> {
        return this.#steps;
    }
}
