import {IsBoolean, IsEmail, IsNotEmpty, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {toLowerCase} from "../../service";
import {BadRequestError} from "../../http/error/bad-request";
import {BCRYPT_ROUNDS} from "../../config";
import User, {hasUser, userToJWT} from "./user";

const B = require('bcryptjs');

export class UserCreate {

    @IsNotEmpty()
    @IsEmail()
    @Transform(toLowerCase)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Transform(toLowerCase)
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsBoolean()
    admin: boolean = false;

}


export async function createUser(createUser: UserCreate) {
    const {
        email,
        name,
        password
    } = createUser;

    const isTakenEmail = await hasUser({ email });
    if (isTakenEmail) {
        throw new BadRequestError("Email is already taken");
    }

    const isTakenName = await hasUser({ name });
    if (isTakenName) {
        throw new BadRequestError("User name is already taken");
    }

    const hash = await B.hashSync(password, BCRYPT_ROUNDS);
    const model = await User.create({
        name,
        email,
        admin: false,
        hash
    });

    const user = model.get({
        plain: true
    });

    delete user.hash;

    return {
        user,
        token: userToJWT(user)
    };
}