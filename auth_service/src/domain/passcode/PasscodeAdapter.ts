export default interface PasscodeAdapter {
    generate(): string;
    verify(token: string): boolean;
}
