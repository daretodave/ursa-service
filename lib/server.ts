import {out} from "./logger";
import {HOST, PORT} from "./config";
import {sync} from "./store";
import {join} from "path";
import {Action, createKoaServer, getMetadataArgsStorage} from "routing-controllers";
import {Server} from "net";
import {routingControllersToSpec} from "routing-controllers-openapi";
import {authorizationChecker, currentUserChecker} from "./http/auth";

out('ursa:server', {
    HOST,
    PORT
});

const server: any = {};
const find = folder => join(__dirname,  folder, '**', '*.js');

export async function run(host = HOST, port: number = PORT) {
    out('ursa:server::run');

    await sync();

    const app: Server = createKoaServer({
        controllers: [find("control")],
        middlewares: [find("middleware")],
        interceptors: [find("interceptors")],
        authorizationChecker,
        currentUserChecker
    });

    app.listen(port, host, () => {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage);

        server.spec = spec;
    });

    server.app = app;

    return server;
}

export {server};