import { MyContext } from "../../types/context";
import { generateMainKeyboard } from "../../keyboards/main.keyboard";
import { localize } from "../../locales/localize";
import { ENG, RU, UZ } from "../../constants/countries";
import { languageMenu } from "../../keyboards/menu/language.menu";
import { showMainMenu } from "../../keyboards/menu/main.menu";

export async function showLanguageMenu(ctx: MyContext) {
  await ctx.reply("Tilni tanlang / Choose your language / Выберите язык :", {
    reply_markup: languageMenu,
  });
}

export async function changeLanguageHandler(ctx: MyContext) {
  // Update the language in the session based on user selection
  switch (ctx.message?.text) {
    case ENG:
      ctx.session.lang = "en";
      break;
    case UZ:
      ctx.session.lang = "uz";
      break;
    case RU:
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
