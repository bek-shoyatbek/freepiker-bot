import { NextFunction } from "grammy";
import { MyContext } from "../types/context";
import { User } from "../../models/user.model";

export async function saveUserDetailsIfDoesExist(
  ctx: MyContext,
  next: NextFunction,
) {
  const chat = await ctx.getChat();
  const userBirthday = chat?.birthdate;
  console.log("User birthdate: ", userBirthday);

  const user = await User.findOne({ telegramId: ctx.from?.id.toString() });
  const username = ctx.from?.username;

  if (user && !user?.username && username) {
    user.username = username;
  }

  if (user && !user?.birthdate && userBirthday) {
    user.birthdate = { day: userBirthday.day, month: userBirthday.month };
  }

  await user?.save();

  await next();
}
