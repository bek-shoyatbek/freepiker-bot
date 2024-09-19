import { InlineKeyboard } from "grammy";
import bot from "../..";
import configs from "../../../configs";
import { Payment } from "../../../models/payment.model";
import { Plan } from "../../../models/plan.model";
import { User } from "../../../models/user.model";
import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";

export const getPaymentChequeHandler = async (ctx: MyContext) => {
  if (!ctx.session.pendingPlan) {
    return ctx.reply("Please select a plan first using /buy [plan title]");
  }

  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  const plan = await Plan.findById(ctx.session.pendingPlan);

  if (!user || !plan) {
    return ctx.reply("An error occurred. Please try again.");
  }
  const chequeImage = ctx.message?.photo;
  if (!chequeImage) {
    return ctx.reply(localize("sendPaymentCheck", ctx.session.lang));
  }

  const fileId = chequeImage[chequeImage.length - 1].file_id;

  const payment = new Payment({
    userId: user._id,
    planId: plan._id,
    amount: plan.price,
    chequeImage: fileId,
  });

  // Save payment
  await payment.save();

  await ctx.reply(localize("paymentProcessing", ctx.session.lang));

  // Send payment to admin group
  const keyboard = new InlineKeyboard()
    .text("Approve", `approve_${payment._id}`)
    .text("Reject", `reject_${payment._id}`);

  await bot.api.sendPhoto(configs.ADMIN_CHANNEL_ID!, fileId, {
    caption: `New payment:\nUser: ${user.name}\nPlan: ${plan.title}\nAmount: $${plan.price}`,
    reply_markup: keyboard,
  });

  delete ctx.session.pendingPlan;
};
