import {IsNotEmpty, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {findUser, userToJWT} from "./user";
import {BadRequestError} from "@wosome/taff/out/http/error/bad-request";

const B = require('bcryptjs');

export class UserAuth {

    @IsNotEmpty()
    @IsString()
    @Transform(toLowerCase)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}


export async function authUser(authUser: UserAuth) {
    const {
        username,
        password
    } = authUser;

    let userModel = await findUser({ email: username });
    if (!userModel) {
        userModel = await findUser({ name: username });
    }

    if (!userModel) {
        throw new BadRequestError("No account with matching user name or email", 403);
    }

    const isMatch = B.compareSync(password, userModel.hash);
    if (!isMatch) {
        throw new BadRequestError("Invalid user name or password", 403);
    }

    const user = userModel.get({
        plain: true
    });

    delete user.hash;

    return {
        token: userToJWT(user),
        user: user
    };
}

function toLowerCase(text) {
    if (typeof text === 'string') {
        return text.toLowerCase();
    }
}