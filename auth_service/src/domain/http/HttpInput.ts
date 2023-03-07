import HttpUserInput from "./HttpUserInput";

export default interface HttpInput {
    params: any;
    body: any;
    query: any;
    headers: any;
    user?: HttpUserInput;
    ip_address: string;
}
