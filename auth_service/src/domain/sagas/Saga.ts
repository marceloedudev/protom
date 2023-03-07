import SagaStep from "./SagaStep";

export default interface Saga {
    stepsDefinitions(): Array<SagaStep>;
}
