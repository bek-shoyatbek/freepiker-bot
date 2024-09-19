import { User } from "../../../models/user.model";
import { MyContext } from "../../types/context";
import { localize } from "../../locales/localize";
import { showLanguageMenu } from "./language.handler";
import { generalMessages } from "../../locales/i18n";

export async function handleStart(ctx: MyContext) {
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    const newUser = new User({
      telegramId: ctx.from!.id.toString(),
      name: ctx.from!.first_name,
    });
    await newUser.save();
    await ctx.reply(generalMessages.greet(ctx.from!.first_name));
  } else {
    await ctx.reply(generalMessages.greetWithOldUser(user.name));
  }

  await showLanguageMenu(ctx);
}
