export default class Eventually {
    static async eventually(timeout: number, body) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (body) {
                    body();
                }
                resolve(true);
            }, timeout);
        });
    }

    static async eventuallyAsync(timeout: number, body) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                if (body) {
                    await body();
                }
                resolve(true);
            }, timeout);
        });
    }
}
