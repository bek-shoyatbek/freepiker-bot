import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";

export const cancelPurchaseHandler = async (ctx: MyContext) => {
  await ctx.editMessageText(localize("cancelPurchase", ctx.session.lang));
  await ctx.answerCallbackQuery();
};
