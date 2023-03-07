export default interface SafeRegexAdapter {
    validate(regex: RegExp): RegExp;
}
