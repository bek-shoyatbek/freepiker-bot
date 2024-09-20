import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";

export const aboutHandler = async (ctx: MyContext) => {
  await ctx.reply(localize("aboutUsRespondText", ctx.session.lang));
};
