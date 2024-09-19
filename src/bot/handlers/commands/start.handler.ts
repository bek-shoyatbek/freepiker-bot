import { User } from "../../../models/user.model";
import { MyContext } from "../../../types/context";
import { i18n } from "../../locales/i18n";
import { localize } from "../../locales/localize";
import { showLanguageMenu } from "./language.handler";

export async function handleStart(ctx: MyContext) {
  const lang = ctx.session.lang;
  const user = await User.findOne({ telegramId: ctx.from!.id.toString() });
  if (!user) {
    const newUser = new User({
      telegramId: ctx.from!.id.toString(),
      name: ctx.from!.first_name,
    });
    await newUser.save();
    await ctx.reply(localize("welcome", lang));
  } else {
    await ctx.reply(localize("welcomeBack", lang));
  }

  await ctx.reply(i18n[lang].greet(ctx.from!.first_name));

  await showLanguageMenu(ctx);
}
