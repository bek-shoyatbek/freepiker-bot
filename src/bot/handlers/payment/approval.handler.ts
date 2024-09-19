import bot from "../..";
import { Payment } from "../../../models/payment.model";
import { UserPlan } from "../../../models/user-plan.model";
import { User } from "../../../models/user.model";
import { MyContext } from "../../../types/context";
import { localize } from "../../locales/localize";

export const paymentApprovalHandler = async (ctx: MyContext) => {
  const paymentId = ctx.match![1];
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return ctx.answerCallbackQuery("Payment not found");
  }

  payment.status = "approved";
  await payment.save();

  const userPlan = new UserPlan({
    userId: payment.userId,
    planId: payment.planId,
    status: "active",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  await userPlan.save();

  const user = await User.findOne({ _id: payment.userId });
  if (!user) {
    return ctx.answerCallbackQuery("User not found");
  }

  await ctx.answerCallbackQuery("✅");

  const userChatId = user.telegramId;
  const approvedMessage = localize("paymentConfirmed", ctx.session.lang);
  console.log("lang", ctx.session.lang);
  console.log("Approved message: ", approvedMessage);
  await bot.api.sendMessage(userChatId, approvedMessage);
};
