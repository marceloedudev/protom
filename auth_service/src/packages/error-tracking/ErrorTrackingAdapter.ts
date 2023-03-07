import ConfigFactory from "@/config/ConfigFactory";
import ConfigMode from "@/config/ConfigMode";
import ErrorTracking from "@/domain/error-tracking/ErrorTracking";
import Rollbar from "rollbar";

export default class ErrorTrackingAdapter implements ErrorTracking {
    private rollbar: Rollbar;

    private configMode: ConfigMode;

    constructor(config: ConfigFactory) {
        this.rollbar = new Rollbar({
            accessToken: `${config.createErrorTracking().getAccessToken()}`,
            captureUncaught: true,
            captureUnhandledRejections: true,
        });
        this.configMode = config.createConfigMode();
    }

    error(...exception): void {
        // console.log({ exception });
        if (!this.configMode.isProduction()) {
            return;
        }
        this.rollbar.error(exception);
    }

    log(...exception): void {
        // console.log({ exception });
        if (!this.configMode.isProduction()) {
            return;
        }
        this.rollbar.log(exception);
    }
}
