export default interface IPAddressAdapter {
    isIP(input: string): boolean;
    isIPv4(input: string): boolean;
    isIPv6(input: string): boolean;
}
