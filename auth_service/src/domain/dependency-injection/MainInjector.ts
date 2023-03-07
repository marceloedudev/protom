import CommandFactory from "@/application/factory/CommandFactory";
import ConfigFactory from "@/config/ConfigFactory";
import DateAdapter from "../date/DateAdapter";
import ErrorTracking from "../error-tracking/ErrorTracking";
import EventProducerFactory from "@/infra/event/queue/factory/EventProducerFactory";
import MessageEventBus from "../eventBus/MessageEventBus";
import PasscodeAdapter from "../passcode/PasscodeAdapter";
import QueryFactory from "@/application/factory/QueryFactory";
import RepositoryDAOFactory from "@/infra/factory/RepositoryDAOFactory";
import UUIDAdapter from "../uuid/UUIDAdapter";
import UsecaseFactory from "@/application/factory/UsecaseFactory";

export default class MainInjector {
    #configFactory: ConfigFactory;

    #postgresConnection: any;

    #dateAdapter: DateAdapter;

    #repositoryDAOFactory: RepositoryDAOFactory;

    #redisConnection: any;

    #mongodbConnection: any;

    #uuidAdapter: UUIDAdapter;

    #passcodeAdapter: PasscodeAdapter;

    #eventProducerFactory: EventProducerFactory;

    #usecaseFactory: UsecaseFactory;

    #queryFactory: QueryFactory;

    #commandFactory: CommandFactory;

    #messageEventBus: MessageEventBus;

    #errorTracking: ErrorTracking;

    constructor({
        configFactory,
        postgresConnection,
        dateAdapter,
        repositoryDAOFactory,
        redisConnection,
        uuidAdapter,
        mongodbConnection,
        passcodeAdapter,
        eventProducerFactory,
        messageEventBus,
        errorTracking,
    }) {
        this.#configFactory = configFactory;
        this.#postgresConnection = postgresConnection;
        this.#dateAdapter = dateAdapter;
        this.#repositoryDAOFactory = repositoryDAOFactory;
        this.#redisConnection = redisConnection;
        this.#uuidAdapter = uuidAdapter;
        this.#mongodbConnection = mongodbConnection;
        this.#passcodeAdapter = passcodeAdapter;
        this.#eventProducerFactory = eventProducerFactory;
        this.#usecaseFactory = new UsecaseFactory(this);
        this.#queryFactory = new QueryFactory(this);
        this.#commandFactory = new CommandFactory(this);
        this.#messageEventBus = messageEventBus;
        this.#errorTracking = errorTracking;
    }

    getConfigFactory() {
        return this.#configFactory;
    }

    getPostgresConnection() {
        return this.#postgresConnection;
    }

    getDateAdapter() {
        return this.#dateAdapter;
    }

    createDAO() {
        return this.#repositoryDAOFactory.createDAO();
    }

    createRepository() {
        return this.#repositoryDAOFactory.createRepository();
    }

    getRedisConnection() {
        return this.#redisConnection;
    }

    getUUIDAdapter() {
        return this.#uuidAdapter;
    }

    getMongoDBConnection() {
        return this.#mongodbConnection;
    }

    getPasscodeAdapter() {
        return this.#passcodeAdapter;
    }

    getEventProducerFactory() {
        return this.#eventProducerFactory;
    }

    getUsecaseFactory() {
        return this.#usecaseFactory;
    }

    getQueryFactory() {
        return this.#queryFactory;
    }

    getCommandFactory() {
        return this.#commandFactory;
    }

    getMessageEventBus() {
        return this.#messageEventBus;
    }

    getErrorTracking() {
        return this.#errorTracking;
    }
}
