export interface Command<Input> {
    execute(request?: Input): void;
}
