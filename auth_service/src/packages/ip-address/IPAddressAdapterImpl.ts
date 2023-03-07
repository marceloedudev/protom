import IPAddressAdapter from "@/domain/ip-address/IPAddressAdapter";
import net from "node:net";

export default class IPAddressAdapterImpl implements IPAddressAdapter {
    isIP(input: string): boolean {
        return this.isIPv4(input) || this.isIPv6(input);
    }

    isIPv4(input: string): boolean {
        return net.isIPv4(input);
    }

    isIPv6(input: string): boolean {
        return net.isIPv6(input);
    }
}
