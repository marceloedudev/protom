export interface Query<Input, Output> {
    execute(request?: Input): Promise<Output> | Output;
}
