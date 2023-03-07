import CreateUserEventConsumer from "@/infra/event/queue/consumer/CreateUserEventConsumer";
import Saga from "@/domain/sagas/Saga";
import SagaStep from "@/domain/sagas/SagaStep";
import SagaStepBuilder from "@/packages/sagas/choreography/SagaStepBuilder";

export default class CreateUserSagas implements Saga {
    #createUserEventConsumer: CreateUserEventConsumer;

    constructor({ usecaseFactory, errorTracking }) {
        this.#createUserEventConsumer = new CreateUserEventConsumer({
            usecaseFactory,
            errorTracking,
        });
    }

    stepsDefinitions(): SagaStep[] {
        return SagaStepBuilder.with()
            .step("Create User")
            .invoke(this.#createUserEventConsumer)
            .build();
    }
}
