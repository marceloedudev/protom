import MainContext from "./context/MainContext";

(async () => {
    await new MainContext().execute();
})();
