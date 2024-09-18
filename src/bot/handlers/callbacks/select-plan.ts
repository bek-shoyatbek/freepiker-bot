import { InlineKeyboard } from "grammy";
import { Plan } from "../../../models/plan.model";
import { MyContext } from "../../../types/context";
import { localize } from "../../locales/localize";
import { i18n } from "../../locales/i18n";

export const selectPlanHandler = async (ctx: MyContext) => {
  const planId = ctx.match![1];
  const plan = await Plan.findById(planId);

  if (!plan) {
    return ctx.answerCallbackQuery("Plan not found. Please try again.");
  }

  const confirmKeyboard = new InlineKeyboard()
    .text(localize("yes", ctx.session.lang), `confirm_purchase:${planId}`)
    .text(localize("reject", ctx.session.lang), "cancel_purchase");

  await ctx.editMessageText(
    `${i18n[ctx.session.lang].tariffConfirmation(plan.title)}
${i18n[ctx.session.lang].price(plan.price)}
${i18n[ctx.session.lang].dailyDownload(plan.dailyRequestCount)}

${i18n[ctx.session.lang].continueSubscription}`,
    { reply_markup: confirmKeyboard }
  );
  await ctx.answerCallbackQuery();
};
