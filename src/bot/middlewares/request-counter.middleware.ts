import {NextFunction} from "grammy";
import {MyContext} from "../types/context";
import {generateMainKeyboard} from "../generators/keyboards/main.keyboard";
import {handleDailyReset, validateUser, validateUserAccess} from "../helpers/requests";


export async function trackRequest(ctx: MyContext, next: NextFunction) {
    try {
        const user = await validateUser(ctx);
        if (!user) return;

        await handleDailyReset(user);

        const {canProceed, message} = await validateUserAccess(user);
        if (!canProceed) {
            await ctx.reply(message, {
                reply_markup: generateMainKeyboard(ctx.session.lang),
            });
            return;
        }

        await next();
    } catch (error) {
        console.error('Error in trackRequest middleware:', error);
        await ctx.reply('An error occurred while processing your request.');
    }
}




