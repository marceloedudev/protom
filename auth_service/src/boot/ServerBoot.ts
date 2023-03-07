import AMQPFactory from "@/packages/amqp/factory/AMQPFactory";
/* eslint-disable security-node/detect-crlf */
import ConfigFactory from "@/config/ConfigFactory";
import DatabaseFactory from "@/packages/database/factory/DatabaseFactory";
import DateAdapter from "@/domain/date/DateAdapter";
import DateAdapterImpl from "@/packages/date/DateAdapterImpl";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import ErrorTrackingAdapter from "@/packages/error-tracking/ErrorTrackingAdapter";
import EventConsumer from "@/infra/event/queue/consumer/EventConsumer";
import EventProducerFactory from "@/infra/event/queue/factory/EventProducerFactory";
import HttpServer from "@/infra/http/server";
import MainInjector from "@/domain/dependency-injection/MainInjector";
import MessageEventBus from "@/domain/eventBus/MessageEventBus";
import MessageEventBusFactory from "@/packages/eventBus/factory/MessageEventBusFactory";
import PasscodeAdapter from "@/domain/passcode/PasscodeAdapter";
import PasscodeAdapterImpl from "@/packages/passcode/PasscodeAdapterImpl";
import RedisClient from "@/domain/redis/RedisClient";
import RepositoryDAOFactory from "@/infra/factory/RepositoryDAOFactory";
import UUIDAdapter from "@/domain/uuid/UUIDAdapter";
import UUIDAdapterImpl from "@/packages/uuid/UUIDAdapterImpl";

export default class ServerBoot {
    private configFactory: ConfigFactory;

    private postgresConnection;

    private redisConnection!: RedisClient;

    private mongodbConnection;

    private mainInjector!: MainInjector;

    private consumer: EventConsumer | null;

    private httpServer;

    private server;

    private postgresDatabase;

    private redisDatabase;

    private mongoDatabase;

    private messageEventBus: MessageEventBus;

    private errorTracking: ErrorTracking;

    constructor() {
        this.configFactory = new ConfigFactory();
        this.consumer = null;
        this.errorTracking = new ErrorTrackingAdapter(this.configFactory);
        const amqpFactory = new AMQPFactory(
            this.configFactory.createConfigMode()
        );
        const amqpConnect = amqpFactory.createAMQP();
        const messageEventBusFactory = new MessageEventBusFactory({
            config: this.configFactory,
            errorTracking: this.errorTracking,
            amqpConnect,
        });
        this.messageEventBus = messageEventBusFactory.createQueue();
    }

    async connection() {
        const database = new DatabaseFactory(this.configFactory);
        this.postgresDatabase = database.createPostgres();
        this.redisDatabase = database.createRedis();
        this.mongoDatabase = database.createMongoDB();
        this.postgresConnection = await this.postgresDatabase.connect();
        this.redisConnection = await this.redisDatabase.connect();
        this.mongodbConnection = await this.mongoDatabase.connect();
        await this.messageEventBus.connect();
    }

    async configure() {
        const dateAdapter: DateAdapter = new DateAdapterImpl();
        const uuidAdapter: UUIDAdapter = new UUIDAdapterImpl();
        const repositoryDAOFactory = new RepositoryDAOFactory({
            postgresConnection: this.postgresConnection,
            redisConnection: this.redisConnection,
            mongodbConnection: this.mongodbConnection,
            configFactory: this.configFactory,
        });
        const passcodeAdapter: PasscodeAdapter = new PasscodeAdapterImpl(
            this.configFactory
        );
        const eventProducerFactory = new EventProducerFactory(
            this.messageEventBus
        );
        this.mainInjector = new MainInjector({
            configFactory: this.configFactory,
            postgresConnection: this.postgresConnection,
            dateAdapter,
            repositoryDAOFactory,
            redisConnection: this.redisConnection,
            uuidAdapter,
            mongodbConnection: this.mongodbConnection,
            passcodeAdapter,
            eventProducerFactory,
            messageEventBus: this.messageEventBus,
            errorTracking: this.errorTracking,
        });
    }

    async addServer() {
        this.httpServer = new HttpServer(this.mainInjector).execute();
        this.server = this.httpServer.getServer();
    }

    async addConsumer() {
        this.consumer = new EventConsumer(this.mainInjector);
        await this.consumer.onInit();
    }

    async destroyAll() {
        if (this.httpServer) {
            this.httpServer.closeServer();
        }
        if (this.consumer) {
            await this.consumer.onExit();
        }
        await Promise.all([
            this.postgresDatabase && this.postgresDatabase.close(),
            this.redisDatabase && this.redisDatabase.close(),
            this.mongoDatabase && this.mongoDatabase.close(),
        ]);
    }

    async gracefulShutdown() {
        const onStop = async (signal) => {
            console.log(`\n${signal} signal received.`);
            await this.destroyAll();
            process.exit(0);
        };
        for (const event of ["SIGINT", "SIGTERM"]) {
            process.on(event, onStop);
        }
    }

    getServer() {
        return this.server;
    }

    getConfigFactory() {
        return this.configFactory;
    }

    getPostgresConnection() {
        return this.postgresConnection;
    }

    getRedisConnection() {
        return this.redisConnection;
    }

    getMongoDBConnection() {
        return this.mongodbConnection;
    }

    getMainInjector() {
        return this.mainInjector;
    }

    getHttpServer() {
        return this.httpServer;
    }
}
