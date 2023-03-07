export interface Usecase<Input, Output> {
    execute(request?: Input): Promise<Output> | Output;
}
