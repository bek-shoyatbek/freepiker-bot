import { NextFunction } from "grammy";
import { MyContext } from "../types/context";
import { IUser, User } from "../../models/user.model";
import { UserPlan } from "../../models/user-plan.model";
import { IPlan } from "../../models/plan.model";
import { localize } from "../locales/localize";
import { generateMainKeyboard } from "../generators/keyboards/main.keyboard";


export async function trackRequest(ctx: MyContext, next: NextFunction) {
  try {
    const user = await validateAndGetUser(ctx);
    if (!user) return;

    await handleDailyReset(user);

    const { canProceed, message } = await validateUserAccess(user);
    if (!canProceed) {
      await ctx.reply(message, {
        reply_markup: generateMainKeyboard(ctx.session.lang),
      });
      return;
    }

    await updateUserRequestCount(user);
    await next();
  } catch (error) {
    console.error('Error in trackRequest middleware:', error);
    await ctx.reply('An error occurred while processing your request.');
  }
}

async function validateAndGetUser(ctx: MyContext) {
  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });

  if (!user) {
    await ctx.reply(
      "You're not registered. Please start the bot with /start command."
    );
    return null;
  }

  return user;
}

async function handleDailyReset(user: IUser) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user?.lastResetDate < today) {
    user.dailyRequestsCount = 0;
    user.lastResetDate = today;
    await user.save();
  }
}

async function validateUserAccess(user: IUser): Promise<{ canProceed: boolean; message: string }> {
  const hasFreeTrial = user.freeTrialCount > 0;
  const userPlans = await getUserPlans(user._id as string);

  // No active plan and no free trial
  if (!userPlans.length && !hasFreeTrial) {
    return {
      canProceed: false,
      message: localize("freeTrialAlreadyUsed", "en") // Replace with actual language
    };
  }

  // Check plan limits if user has an active plan
  if (userPlans.length) {
    const plan = userPlans[userPlans.length - 1].planId as unknown as IPlan;
    if (user.dailyRequestsCount >= plan.dailyRequestCount) {
      return {
        canProceed: false,
        message: "You have reached your daily request limit. Please try again tomorrow or upgrade your plan."
      };
    }
  }

  return { canProceed: true, message: '' };
}

async function getUserPlans(userId: string) {
  return await UserPlan.find({
    userId,
    status: "active",
  }).populate("planId");
}

async function updateUserRequestCount(user: IUser) {
  const hasFreeTrial = user.freeTrialCount > 0;

  if (hasFreeTrial) {
    user.freeTrialCount -= 1;
  }

  user.dailyRequestsCount += 1;
  await user.save();
}