import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";

export const confirmPurchaseHandler = async (ctx: MyContext) => {
  const planId = ctx.match![1];
  ctx.session.pendingPlan = planId;

  await ctx.editMessageText(localize("sendPaymentCheck", ctx.session.lang));
  await ctx.answerCallbackQuery();
};
