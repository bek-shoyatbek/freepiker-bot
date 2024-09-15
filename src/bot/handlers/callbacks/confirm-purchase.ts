import { MyContext } from "../../../types/context";

export const confirmPurchaseHandler = async (ctx: MyContext) => {
  const planId = ctx.match![1];
  ctx.session.pendingPlan = planId;

  await ctx.editMessageText(
    "Please send the payment cheque as an image or PDF."
  );
  await ctx.answerCallbackQuery();
};
