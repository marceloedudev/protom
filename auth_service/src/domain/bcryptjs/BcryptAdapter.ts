export default interface BcryptAdapter {
    hash(password: string, salt?: number): Promise<string>;
    compare(password: string, passwordHash: string): Promise<boolean>;
}
