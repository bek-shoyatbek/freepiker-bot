import { generateReferalLink } from "../../generators/referal";
import { MyContext } from "../../types/context";

export const onReferalCommand = async (ctx: MyContext) => {
    await ctx.reply(`Referal link: ${generateReferalLink(ctx.from!.id.toString())}`);
    return;
}