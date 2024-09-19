import { InlineKeyboard } from "grammy";
import { Plan } from "../../../models/plan.model";
import { localize } from "../../locales/localize";
import { MyContext } from "../../types/context";

export const viewPlansHandler = async (ctx: MyContext) => {
  const plans = await Plan.find();
  const keyboard = new InlineKeyboard();

  plans.forEach((plan) => {
    keyboard
      .text(`${plan.title?.toUpperCase()}`, `select_plan:${plan._id}`)
      .row();
  });

  await ctx.reply(localize("plans", ctx.session.lang), {
    reply_markup: keyboard,
  });
};
