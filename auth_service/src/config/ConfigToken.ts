class ConfigToken {
    accessTokenLifeTime() {
        return 3600;
    }

    refreshTokenLifeTime() {
        return 1209600;
    }

    getSecretPasscode() {
        return "ASfaga8g45g5d5fg";
    }

    getAuthenticateExpireTime() {
        return 5 * 60; // secs / 5 min
    }
}

export default ConfigToken;
