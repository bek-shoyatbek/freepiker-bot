import {MyContext} from "../../types/context";
import {User} from "../../../models/user.model";

export async function validateUser(ctx: MyContext) {
    const user = await User.findOne({telegramId: ctx.from?.id.toString()});

    if (!user) {
        await ctx.reply(
            "You're not registered. Please start the bot with /start command."
        );
        return null;
    }

    return user;
}