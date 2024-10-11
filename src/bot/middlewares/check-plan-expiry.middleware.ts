import { NextFunction } from "grammy";
import { MyContext } from "../types/context";
import { User } from "../../models/user.model";
import { UserPlan } from "../../models/user-plan.model";

export async function checkPlanExpiry(ctx: MyContext, next: NextFunction) {
  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });
  if (!user) {
    await ctx.reply(
      "You're not registered. Please start the bot with /start command.",
    );
    return;
  }

  const now = new Date();
  const userPlans = await UserPlan.find({
    userId: user._id,
    status: { $in: ["active", "pending"] },
  });

  for (const plan of userPlans) {
    if (plan.endDate && plan.endDate < now) {
      plan.status = "expired";
      await plan.save();
    }
  }

  await next();
}
