import DateAdapter from "@/domain/date/DateAdapter";
import DateAdapterImpl from "@/packages/date/DateAdapterImpl";

class Exception extends Error {
    constructor(
        readonly messages: Array<string> = [],
        readonly status: number,
        readonly error: string,
        readonly timestamp?: Date
    ) {
        super();
        const dateAdapter: DateAdapter = new DateAdapterImpl();
        this.timestamp = this.timestamp ?? dateAdapter.now();
    }
}

export default Exception;
