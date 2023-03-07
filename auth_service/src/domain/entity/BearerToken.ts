import NotificationContext from "../errors/base/NotificationErrors";

export default class BearerToken {
    private notifications: NotificationContext;

    private token: string;

    constructor(bearerHeader) {
        let token;
        if (bearerHeader !== undefined) {
            [, token] = this.explodeBearerHeader(bearerHeader);
        }
        this.token = token;
        this.notifications = new NotificationContext();
    }

    public validate(): boolean {
        if (this.token === undefined) {
            this.notifications.addError("Forbidden");
        }
        return this.notifications.hasErrors();
    }

    public getNotifications(): string[] {
        return this.notifications.getErrors();
    }

    public getToken(): string {
        return this.token;
    }

    private explodeBearerHeader(bearerHeader): Array<string | undefined> {
        try {
            return bearerHeader.split(" ");
        } catch (error) {
            return [undefined, undefined];
        }
    }
}
