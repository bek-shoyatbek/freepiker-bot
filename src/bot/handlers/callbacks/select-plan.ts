import { InlineKeyboard } from "grammy";
import { Plan } from "../../../models/plan.model";
import { MyContext } from "../../../types/context";

export const selectPlanHandler = async (ctx: MyContext) => {
  const planId = ctx.match![1];
  const plan = await Plan.findById(planId);

  if (!plan) {
    return ctx.answerCallbackQuery("Plan not found. Please try again.");
  }

  const confirmKeyboard = new InlineKeyboard()
    .text("Confirm Purchase", `confirm_purchase:${planId}`)
    .text("Cancel", "cancel_purchase");

  await ctx.editMessageText(
    `You selected: ${plan.title}\nPrice: $${plan.price}\nDaily Requests: ${plan.dailyRequestCount}\n\nDo you want to proceed with the purchase?`,
    { reply_markup: confirmKeyboard }
  );
  await ctx.answerCallbackQuery();
};
