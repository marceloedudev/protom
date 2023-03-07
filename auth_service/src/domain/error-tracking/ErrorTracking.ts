export default interface ErrorTracking {
    error(...exception): void;
    log(...exception): void;
}
