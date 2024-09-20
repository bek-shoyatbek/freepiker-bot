import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";

export const supportHandler = async (ctx: MyContext) => {
  await ctx.reply(localize("supportRespondText", ctx.session.lang));
};
