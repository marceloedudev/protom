import ConfigErrorTracking from "./ConfigErrorTracking";
import ConfigHttp from "./ConfigHttp";
import ConfigMode from "./ConfigMode";
import ConfigMongoDB from "./ConfigMongoDB";
import ConfigPostgres from "./ConfigPostgres";
import ConfigRabbitMQ from "./ConfigRabbitMQ";
import ConfigRedis from "./ConfigRedis";
import ConfigToken from "./ConfigToken";

class ConfigFactory {
    createConfigPostgres(): ConfigPostgres {
        return new ConfigPostgres();
    }

    createConfigRedis(): ConfigRedis {
        return new ConfigRedis();
    }

    createConfigMongoDB(): ConfigMongoDB {
        return new ConfigMongoDB();
    }

    createConfigMode(): ConfigMode {
        return new ConfigMode();
    }

    createConfigHttp(): ConfigHttp {
        return new ConfigHttp();
    }

    createConfigToken(): ConfigToken {
        return new ConfigToken();
    }

    createConfigRabbitMQ(): ConfigRabbitMQ {
        return new ConfigRabbitMQ();
    }

    createErrorTracking(): ConfigErrorTracking {
        return new ConfigErrorTracking();
    }
}

export default ConfigFactory;
