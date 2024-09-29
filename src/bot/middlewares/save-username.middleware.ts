import { NextFunction } from "grammy";
import { MyContext } from "../types/context";
import { User } from "../../models/user.model";

export async function saveUsernameIfDoesExist(
  ctx: MyContext,
  next: NextFunction,
) {
  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });
  const username = ctx.from?.username;

  if (user && !user?.username && username) {
    user.username = username;
    await user.save();
  }
  await next();
}
