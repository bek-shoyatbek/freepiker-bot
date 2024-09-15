import bot from "../..";
import { Payment } from "../../../models/payment.model";
import { User } from "../../../models/user.model";
import { MyContext } from "../../../types/context";

export const paymentRejectionHandler = async (ctx: MyContext) => {
  const paymentId = ctx.match![1];
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return ctx.answerCallbackQuery("Payment not found");
  }

  payment.status = "rejected";
  await payment.save();

  await ctx.answerCallbackQuery("Payment rejected");
  const user = await User.findOne({ _id: payment.userId });
  if (!user) {
    return ctx.answerCallbackQuery("User not found");
  }

  const userChatId = user.telegramId;
  await bot.api.sendMessage(
    userChatId,
    "Your payment has been rejected. Please contact support for more information."
  );
};
