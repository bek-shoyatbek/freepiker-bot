import { IPlan } from "../../../models/plan.model";
import { UserPlan } from "../../../models/user-plan.model";
import { User } from "../../../models/user.model";
import { MyContext } from "../../types/context";
import { i18n } from "../../locales/i18n";
import { localize } from "../../locales/localize";

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
    `${i18n[ctx.session.lang].currentPlan(plan.title)}
${localize("dailyDownloadText", ctx.session.lang)} ${user.dailyRequestsCount}/${
      plan.dailyRequestCount
    }
${i18n[ctx.session.lang].expiresOn(
  userPlan[userPlan.length - 1].endDate.toDateString()
)}`
  );
};
