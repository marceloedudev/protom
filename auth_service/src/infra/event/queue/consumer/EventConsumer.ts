import CreateUserSagas from "@/infra/sagas/CreateUserSagas";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";
import Saga from "@/domain/sagas/Saga";
import UsecaseFactory from "@/application/factory/UsecaseFactory";
import UserRevokeTokenSagas from "@/infra/sagas/UserRevokeTokenSagas";

export default class EventConsumer {
    #usecaseFactory: UsecaseFactory;

    #messageEventBus: MessageEventBus;

    #errorTracking: ErrorTracking;

    constructor(mainInjector: MainInjector) {
        this.#messageEventBus = mainInjector.getMessageEventBus();
        this.#usecaseFactory = mainInjector.getUsecaseFactory();
        this.#errorTracking = mainInjector.getErrorTracking();
    }

    private registerSagas(): Array<Saga> {
        const injector = {
            usecaseFactory: this.#usecaseFactory,
            errorTracking: this.#errorTracking,
        };
        return [
            new CreateUserSagas(injector),
            new UserRevokeTokenSagas(injector),
        ];
    }

    public async onInit() {
        this.#messageEventBus.setSagas(this.registerSagas());
        await this.#messageEventBus.onStart();
    }

    public async onExit() {
        await this.#messageEventBus.closeChannels();
        await this.#messageEventBus.close();
    }
}
