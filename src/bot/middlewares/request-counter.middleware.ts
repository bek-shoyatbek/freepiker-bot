import { NextFunction } from "grammy";
import { MyContext } from "../../types/context";
import { User } from "../../models/user.model";
import { UserPlan } from "../../models/user-plan.model";
import { IPlan } from "../../models/plan.model";

// Request tracking middleware
export async function trackRequest(ctx: MyContext, next: NextFunction) {
  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });
  if (user) {
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

    if (!userPlans) {
      await ctx.reply(
        "You don't have an active plan. Please purchase a plan to use this feature.",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "View Available Plans", callback_data: "view_plans" }],
            ],
          },
        }
      );
      return;
    }

    const plan = userPlans[userPlans.length - 1].planId as unknown as IPlan;
    if (user.dailyRequestsCount >= plan.dailyRequestCount) {
      await ctx.reply(
        "You have reached your daily request limit. Please try again tomorrow or upgrade your plan."
      );
      return;
    }
    user.dailyRequestsCount += 1;
    await user.save();
  } else {
    await ctx.reply(
      "You're not registered. Please start the bot with /start command."
    );
    return;
  }
  await next();
}
