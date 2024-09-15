import { IPlan } from "../../../models/plan.model";
import { UserPlan } from "../../../models/user-plan.model";
import { User } from "../../../models/user.model";
import { MyContext } from "../../../types/context";

// Update "My Subscription" handler to include request count
export const mySubsHandler = async (ctx: MyContext) => {
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    return ctx.reply("User not found. Please use /start to register.");
  }

  const userPlan = await UserPlan.find({
    userId: user._id,
    status: "active",
  }).populate("planId");

  if (!userPlan) {
    return ctx.reply(
      'You don\'t have an active subscription. Use "📊 View Plans" to subscribe.'
    );
  }


  const plan = userPlan[userPlan.length - 1].planId as unknown as IPlan;
  await ctx.reply(
    `Your current plan: ${plan.title}\n` +
      `Daily requests: ${user.dailyRequestsCount}/${plan.dailyRequestCount}\n` +
      `Expires on: ${userPlan[userPlan.length - 1].endDate.toDateString()}`
  );
};
