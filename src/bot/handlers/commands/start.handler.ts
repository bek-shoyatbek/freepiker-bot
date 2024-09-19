import { User } from "../../../models/user.model";
import { generalMessages } from "../../locales/i18n";
import { MyContext } from "../../types/context";
import { showLanguageMenu } from "./language.handler";

export async function handleStart(ctx: MyContext) {
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    const newUser = new User({
      telegramId: ctx.from!.id.toString(),
      name: ctx.from!.first_name,
    });
    await newUser.save();
    await ctx.reply(generalMessages.greetWithNewUser(ctx.from!.first_name));
  } else {
    await ctx.reply(generalMessages.greetWithOldUser(ctx.from!.first_name));
  }

  await showLanguageMenu(ctx);
}
