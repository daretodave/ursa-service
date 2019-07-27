import "reflect-metadata";
import {Provider, Taff} from "@wosome/taff";
import {authorizationChecker, currentUserChecker} from "./auth";
import {StoreModels} from "./model";

Taff.service("ursa")
    .provide(Provider.AUTH_GUARD, authorizationChecker)
    .provide(Provider.AUTH_USER, currentUserChecker)
    .provide(Provider.STORE_MODEL, ...StoreModels)
    .run();