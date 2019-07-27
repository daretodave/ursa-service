import {Action} from "routing-controllers";
import User, {jwtToUser} from "./model/user/user";

export const currentUserChecker = async (action: Action) => {
    const bearer = action.request.headers["authorization"];
    if (!bearer) {
        return;
    }

    const token = bearer.slice(7);

    const payload = jwtToUser(token);
    if (!payload || !payload.user || !payload.user["id"]) {
        return;
    }

    const model = await User.findByPk(payload.user["id"]);
    if (!model) {
        return false;
    }

    const user = model.get({plain: true});

    delete user.hash;

    return user;
};
export const authorizationChecker = async (action: Action, roles: string[]) => {
    const user = await currentUserChecker(action);
    if (!user) {
        return false;
    }

    if (!roles.length) {
        return true;
    }
    if (roles.includes("ADMIN")) {
        return user.admin;
    }

    return false;
};