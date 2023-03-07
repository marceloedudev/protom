/**
 * https://gist.github.com/creisle/05496b0ed79292b253c697df44cbbdaa
 */

export default class ExpressSubroutersListAll {
    /**
     * This is a HACK to fetch all routes from an express
     * router with nested sub-routers
     *
     * It uses the regex pattern added to the sub-router and
     * tries to normalize it into something more human readable
     * since this doesn't appear to be stored elsewhere as far
     * as I could tell
     */
    private replaceParams(string) {
        let curr = string;
        let last = "";
        let paramCount = 1;
        while (last !== curr) {
            last = curr.slice();
            paramCount += 1;
            // this is the pattern that express uses when you define your path param without a custom regex
            curr = curr.replace("(?:([^\\/]+?))", `:param${paramCount}`);
        }
        return curr;
    }

    /**
     * @param {express.Router} initialRouter the top level router
     * @returns {Array.<Object>} route definitions
     *
     * @example
     * > fetchRoutes(router)
     * [
     *      {path: '/some/express/route', methods: {get: true}}
     * ]
     */
    public fetchRoutes(initialRouter) {
        // eslint-disable-next-line no-underscore-dangle
        const _fetchRoutes = (router, prefix = "") => {
            const routes: any = [];
            router.stack.forEach(({ route, handle, name, ...rest }) => {
                if (route) {
                    // routes registered directly on the app
                    const path = this.replaceParams(
                        `${prefix}${route.path}`
                    ).replace(/\\/g, "");
                    routes.push({ path, methods: route.methods });
                } else if (name === "router") {
                    // router middleware
                    const newPrefix = rest.regexp.source
                        .replace("\\/?(?=\\/|$)", "") // this is the pattern express puts at the end of a route path
                        .slice(1)
                        .replace("\\", ""); // remove escaping to make paths more readable
                    routes.push(..._fetchRoutes(handle, prefix + newPrefix));
                }
            });
            return routes;
        };
        return _fetchRoutes(initialRouter);
    }
}
