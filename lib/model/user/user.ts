import {Table, Column, Model, HasMany, Unique, AutoIncrement, PrimaryKey, NotEmpty} from 'sequelize-typescript';
import {JWT_SECRET} from "../../config";

const jwt = require('jsonwebtoken');
@Table
export default class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Unique
    @Column
    email: string;

    @NotEmpty
    @Column
    hash: string;

    @Column
    admin: boolean;

}

export async function findUser(properties: Partial<User>) {
    return User.findOne({
        where: <any>properties
    });
}

export async function hasUser(properties: Partial<User>) {
    const user = await findUser(properties);

    return !!user;
}

export function userToJWT(user: User) {
    delete user.hash;

    const payload: any = {
        user: user
    };

    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

export function jwtToUser(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}


export {User};