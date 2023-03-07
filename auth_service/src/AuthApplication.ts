import "@/packages/env";

import ServerBoot from "./boot/ServerBoot";

class AuthApplication {
    private serverBoot: ServerBoot;

    constructor() {
        this.serverBoot = new ServerBoot();
    }

    async main(): Promise<void> {
        await this.serverBoot.connection();
        await this.serverBoot.configure();
        await this.serverBoot.addServer();
        await this.serverBoot.addConsumer();
        await this.serverBoot.gracefulShutdown();
    }
}

(async () => {
    try {
        const authApplication = new AuthApplication();
        await authApplication.main();
    } catch (e) {
        console.error(e);
    }
})();
