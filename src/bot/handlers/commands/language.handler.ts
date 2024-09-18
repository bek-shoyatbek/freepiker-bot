import { MyContext } from "../../../types/context";
import {
  generateMainKeyboard,
  languageMenu,
  showMainMenu,
} from "../../constants/keyboards/main.keyboard";
import { localize } from "../../locales/localize";

export async function showLanguageMenu(ctx: MyContext) {
  await ctx.reply(localize("chooseLanguage", ctx.session.lang), {
    reply_markup: languageMenu,
  });
}

export async function changeLanguageHandler(ctx: MyContext) {
  console.log("On language change handler");
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

  // Show main menu
  await showMainMenu(ctx);
}
