export default interface DataStressTest {
    before(): Promise<void>;
    after(): Promise<void>;
}
