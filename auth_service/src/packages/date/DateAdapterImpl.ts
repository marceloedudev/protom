import DateAdapter from "@/domain/date/DateAdapter";

export default class DateAdapterImpl implements DateAdapter {
    now(): Date {
        return new Date();
    }
}
