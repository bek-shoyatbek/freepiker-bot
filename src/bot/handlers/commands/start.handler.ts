import { User } from "../../../models/user.model";
import { MyContext } from "../../../types/context";
import { MAIN_MANU_KEYBOARD } from "../../constants/keyboards/main.keyboard";

export async function handleStart(ctx: MyContext) {
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    const newUser = new User({
      telegramId: ctx.from!.id.toString(),
      name: ctx.from!.first_name,
    });
    await newUser.save();
    await ctx.reply("Welcome! You have been registered.");
  } else {
    await ctx.reply("Welcome back!");
  }
  await ctx.reply("Please select an option:", {
    reply_markup: MAIN_MANU_KEYBOARD,
  });
}
