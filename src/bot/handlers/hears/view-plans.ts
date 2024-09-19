import { InlineKeyboard } from "grammy";
import { Plan } from "../../../models/plan.model";
import { MyContext } from "../../../types/context";
import { localize } from "../../locales/localize";

export const viewPlansHandler = async (ctx: MyContext) => {
  const plans = await Plan.find();
  const keyboard = new InlineKeyboard();

  plans.forEach((plan) => {
    keyboard.text(`${plan.title}`).row();
  });

  await ctx.reply(localize("plans", ctx.session.lang), {
    reply_markup: keyboard,
  });
};
