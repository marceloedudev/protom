import IPAddressAdapter from "@/domain/ip-address/IPAddressAdapter";
import IPAddressAdapterImpl from "@/packages/ip-address/IPAddressAdapterImpl";
import NotificationContext from "../errors/base/NotificationErrors";

export default class IPAddress {
    #value: string;

    #ipAddressAdapter: IPAddressAdapter;

    constructor(value) {
        this.#value = value;
        this.#ipAddressAdapter = new IPAddressAdapterImpl();
    }

    validate(notifications: NotificationContext): boolean {
        if (!this.#value || this.#value === "") {
            notifications.addError("IP address is required");
        }
        if (this.#value !== "" && !this.#ipAddressAdapter.isIP(this.#value)) {
            notifications.addError("Invalid ip address");
        }
        return notifications.hasErrors();
    }

    setValue(value: string): void {
        this.#value = value;
    }

    getValue(): string {
        return this.#value;
    }
}
