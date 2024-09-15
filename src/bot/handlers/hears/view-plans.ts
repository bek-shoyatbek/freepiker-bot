import { InlineKeyboard } from "grammy";
import { Plan } from "../../../models/plan.model";
import { MyContext } from "../../../types/context";

export const viewPlansHandler = async (ctx: MyContext) => {
  const plans = await Plan.find();
  const keyboard = new InlineKeyboard();

  plans.forEach((plan) => {
    keyboard
      .text(`${plan.title} - $${plan.price}`, `select_plan:${plan._id}`)
      .row();
  });

  await ctx.reply("Select a plan:", { reply_markup: keyboard });
};
