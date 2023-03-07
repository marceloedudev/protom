import SafeRegexAdapter from "../../domain/safe-regex/SafeRegexAdapter";
import safeRegex from "safe-regex";

export default class SafeRegexAdapterImpl implements SafeRegexAdapter {
    validate(regex: RegExp): RegExp {
        const safe = safeRegex(regex);
        if (!safe) {
            throw new Error(`Invalid Refex: ${regex}`);
        }
        return regex;
    }
}
