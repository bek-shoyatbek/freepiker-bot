import { MyContext } from "../../../types/context";
import {
  generateMainKeyboard,
  languageMenu,
  showMainMenu,
} from "../../constants/keyboards/main.keyboard";
import { i18n } from "../../locales/i18n";
import { localize } from "../../locales/localize";

export async function showLanguageMenu(ctx: MyContext) {
  await ctx.reply("Tilni tanlang / Choose your language / Выберите язык :", {
    reply_markup: languageMenu,
  });
}

export async function changeLanguageHandler(ctx: MyContext) {
  // Update the language in the session based on user selection
  switch (ctx.message?.text) {
    case "English":
      ctx.session.lang = "en";
      break;
    case "O'zbek":
      ctx.session.lang = "uz";
      break;
    case "Русский":
      ctx.session.lang = "ru";
      break;
    default:
      // If somehow an invalid option is selected, default to English
      ctx.session.lang = "en";
  }

  // Generate new keyboard with updated language
  const newKeyboard = generateMainKeyboard(ctx.session.lang);

  // Send a message with the new keyboard
  await ctx.reply(localize("languageSet", ctx.session.lang), {
    reply_markup: newKeyboard,
  });

  await ctx.reply(i18n[ctx.session.lang].greet(ctx.from!.first_name));

  // Show main menu
  await showMainMenu(ctx);
}
