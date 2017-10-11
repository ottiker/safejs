// TODO: error handling.
import App from "./lib/api.js";

// connect the safe app to the safe network
function withUri (handle, authUri) {
    return window.safeApp.connectAuthorised(handle, authUri).then((handle) => {
        return App(handle, authUri);
    });
}

// get an authorised and connectd app instance
export default (config) => {

    // create unauthorized and unconnected safe app instance
    return window.safeApp.initialise(config)
    .then((handle) => {

        // connect without authorization (only for public available data)
        if (!config.containers && !config.own_container) {
            return window.safeApp.connect(handle).then(App);
        }

        // try to connect with a authorized app
        const authUri = window.sessionStorage.getItem(config.id);
        if (authUri) {
            return withUri(handle, authUri);
        }

        // authorize safe app. this will promt the authorize dialog with the users authenticator
        return window.safeApp.authorise(handle, config.containers || {}, {own_container: config.own_container || false})
        .then((authUri) => {

            // safe authenticated app in session storage
            window.sessionStorage.setItem(config.id, authUri);
            return withUri(handle, authUri);
        });
    }).then((app) => {

        // add meta data to app instance
        for (let key in config) {
            app.meta[key] = config[key];
        }
        return app;
    });
}
