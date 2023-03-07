import Saga from "@/domain/sagas/Saga";
import SagaStep from "@/domain/sagas/SagaStep";
import SagaStepBuilder from "@/packages/sagas/choreography/SagaStepBuilder";
import UserRevokeTokenEventConsumer from "../event/queue/consumer/UserRevokeTokenEventConsumer";

export default class UserRevokeTokenSagas implements Saga {
    #userRevokeTokenEventConsumer: UserRevokeTokenEventConsumer;

    constructor({ usecaseFactory, errorTracking }) {
        this.#userRevokeTokenEventConsumer = new UserRevokeTokenEventConsumer({
            usecaseFactory,
            errorTracking,
        });
    }

    stepsDefinitions(): SagaStep[] {
        return SagaStepBuilder.with()
            .step("User Revoke Token")
            .invoke(this.#userRevokeTokenEventConsumer)
            .build();
    }
}
