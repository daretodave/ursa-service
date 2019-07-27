import {Authorized, Body, JsonController, Post} from "routing-controllers";
import {Service} from "@wosome/taff";
import {createUser, UserCreate} from "../model/user/user-create";

@JsonController("/admin")
export class AdminController {

    @Post("/user-create")
    @Authorized("ADMIN")
    async userCreate(@Body() userCreate: UserCreate) {
        await Service.verify(userCreate);

        const user = await createUser(userCreate);

        return Service.reply({
            userCreate,
            user
        });
    }

}