import {Authorized, Body, CurrentUser, Get, JsonController, Post} from "routing-controllers";
import {createUser, UserCreate} from "../model/user/user-create";
import {Service} from "../service";
import {authUser, UserAuth} from "../model/user/user-auth";
import User from "../model/user/user";

@JsonController("/auth")
export class UserController {

    @Get("/")
    @Authorized()
    me(@CurrentUser() user: User) {
        return user;
    }

    @Post("/sign-in")
    async logIn(@Body() userAuth: UserAuth) {
        await Service.verify(userAuth);

        const reply = await authUser(userAuth);

        return Service.reply(reply);
    }

    @Post("/sign-up")
    async signUp(@Body() userCreate: UserCreate) {
        await Service.verify(userCreate);

        const reply = await createUser(userCreate);

        return Service.reply(reply);
    }

}