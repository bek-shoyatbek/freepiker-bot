import { NextFunction } from "grammy";
import { MyContext } from "../types/context";
import { User } from "../../models/user.model";
import { UserPlan } from "../../models/user-plan.model";
import { IPlan } from "../../models/plan.model";
import { localize } from "../locales/localize";
import { generateMainKeyboard } from "../generators/keyboards/main.keyboard";

export async function trackRequest(ctx: MyContext, next: NextFunction) {
  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });

  if (!user) {
    await ctx.reply(
      "You're not registered. Please start the bot with /start command."
    );
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastResetDate < today) {
    // Reset count if it's a new day
    user.dailyRequestsCount = 0;
    user.lastResetDate = today;
  }

  const userPlans = await UserPlan.find({
    userId: user._id,
    status: "active",
  }).populate("planId");

  // Check if the user has used their free trial
  if (!userPlans.length && user.freeTrialUsed) {
    await ctx.reply(localize("freeTrialAlreadyUsed", ctx.session.lang), {
      reply_markup: generateMainKeyboard(ctx.session.lang),
    });
    return;
  }

  if (userPlans.length) {
    const plan = userPlans[userPlans.length - 1].planId as unknown as IPlan;
    if (user.dailyRequestsCount >= plan.dailyRequestCount) {
      await ctx.reply(
        "You have reached your daily request limit. Please try again tomorrow or upgrade your plan."
      );
      return;
    }
  } else {
    // This is the user's free trial usage
    user.freeTrialUsed = true;
  }

  user.dailyRequestsCount += 1;
  await user.save();

  await next();
}
