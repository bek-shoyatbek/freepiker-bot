import { generateReferalLink } from "../../generators/referal";
import { MyContext } from "../../types/context";

export const onReferalCommand = async (ctx: MyContext) => {
    const referalLink = generateReferalLink(ctx.from!.id.toString());
    await ctx.reply(`Referal link: ${referalLink}`);
    return;
}